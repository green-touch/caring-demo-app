package com.greentouch_demo_app.foregroundService

import android.app.*
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.ConnectivityManager
import android.os.*
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.greentouch_demo_app.MainApplication

class ForegroundService : Service() {

    companion object {
        private const val NOTIFICATION_ID = 1
        private const val CHANNEL_ID = "foreground_service_channel_id"
        private const val CHANNEL_NAME = "Foreground Service Channel"
        private const val ALERT_CHANNEL_ID = "alert_notification_channel_id"
        private const val ALERT_CHANNEL_NAME = "Alert Notification Channel"
    }

    private val handler = Handler(Looper.getMainLooper())
    private val updateInterval = 10000L // 10초 간격으로 업데이트
    private lateinit var userStatusProvider: UserStatusProvider
    private lateinit var networkChangeReceiver: NetworkChangeReceiver

    private var lastSentCode: String? = null
    private var lastSentTime: Long = 0L
    private var lastScreenOffTime: Long = 0L

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        userStatusProvider = UserStatusProvider(this)

        // 네트워크 상태 변경 리스너 등록
        networkChangeReceiver = NetworkChangeReceiver(this)
        val intentFilter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        registerReceiver(networkChangeReceiver, intentFilter)

        Log.d("ForegroundService", "Service created and NetworkChangeReceiver registered")
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_LOW
            )

            val alertChannel = NotificationChannel(
                ALERT_CHANNEL_ID,
                ALERT_CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                enableLights(true)
                enableVibration(true)
                description = "경고 알림용 채널"
            }

            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(channel)
            manager?.createNotificationChannel(alertChannel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val resourceId = resources.getIdentifier("logo_symbol", "drawable", packageName)
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Foreground Service Running")
            .setContentText("백그라운드에서 앱을 실행중입니다.")
            .setSmallIcon(resourceId)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .build()

        startForeground(NOTIFICATION_ID, notification)
        startTrackingUserState()

        return START_STICKY
    }

    fun startTrackingUserState() {
        handler.post(object : Runnable {
            override fun run() {
                try {
                    val batteryStatus = userStatusProvider.getBatteryStatus()
                    val screenStatus = userStatusProvider.getScreenStatus()
                    val networkStatus = userStatusProvider.getNetworkStatus()


                          // 네트워크 상태에 따라 알림 취소
                    if (networkStatus) {
                        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                        notificationManager.cancel("NET-02".hashCode())
                        notificationManager.cancel("NET-04".hashCode())
                    }
                    val screenOffDuration = if (!screenStatus && lastScreenOffTime != 0L) {
                        System.currentTimeMillis() - lastScreenOffTime
                    } else {
                        if (screenStatus) lastScreenOffTime = 0L
                        0L
                    }

                    val code = when {
                        !networkStatus -> if ((batteryStatus["level"] as Int) < 10 || screenOffDuration >= 120000) {
                            "NET-04"
                        } else {
                            "NET-02"
                        }
                        (batteryStatus["level"] as Int) < 10 && !(batteryStatus["isCharging"] as Boolean) -> "BAT-02"
                        (batteryStatus["level"] as Int) < 20 && !(batteryStatus["isCharging"] as Boolean) -> "BAT-01"
                        !screenStatus -> if (screenOffDuration >= 120000) {
                            "SCR-02"
                        } else if (screenOffDuration >= 60000) {
                            "SCR-01"
                        } else null
                        else -> null
                    }

                    val userState = when (code) {
                        "NET-04", "BAT-02", "SCR-02" -> "위험"
                        "NET-02", "BAT-01", "SCR-01" -> "경고"
                        else -> "정상"
                    }

                    if (userState != "정상") {
                        sendNotification(code)
                    }

                    sendEventToReactNative(
                        mapOf(
                            "batteryLevel" to batteryStatus["level"],
                            "isCharging" to batteryStatus["isCharging"],
                            "networkStatus" to networkStatus,
                            "screenStatus" to screenStatus,
                            "screenOffDuration" to screenOffDuration,
                            "userState" to userState,
                            "code" to code
                        )
                    )

                } catch (e: Exception) {
                    Log.e("ForegroundService", "Error in tracking user state", e)
                }

                handler.postDelayed(this, updateInterval)
            }
        })
    }

    private fun sendNotification(code: String?) {
        if (code == null) return
    
        val currentTime = System.currentTimeMillis()
    
        // 동일 코드 5분 이내 중복 알림 방지
        if (lastSentCode == code && currentTime - lastSentTime < 5 * 60 * 1000) {
            Log.d("ForegroundService", "Skipping duplicate notification for code=$code")
            return
        }
    
        // 네트워크 연결 상태에 따른 알림 제거
        if (code.startsWith("NET") && userStatusProvider.getNetworkStatus()) {
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.cancel("NET-02".hashCode())
            notificationManager.cancel("NET-04".hashCode())
            Log.d("ForegroundService", "Network reconnected, cancelling NET notifications")
            return
        }
    
        lastSentCode = code
        lastSentTime = currentTime
    
        val (title, message) = when (code) {
            "NET-02" -> "네트워크 연결 끊김" to "네트워크에 연결해주세요."
            "NET-04" -> "네트워크 위험 끊김" to "네트워크 연결이 필요합니다."
            "BAT-01" -> "배터리 부족 경고" to "배터리 잔량이 20% 이하입니다."
            "BAT-02" -> "배터리 부족 위험" to "배터리 잔량이 10% 이하입니다."
            "SCR-01" -> "앱 장기간 미접속 경고" to "화면이 꺼진 지 1분 이상입니다."
            "SCR-02" -> "앱 장기간 미접속 위험" to "화면이 꺼진 지 2분 이상입니다."
            else -> return
        }
    
        val resourceId = resources.getIdentifier("logo_symbol", "drawable", packageName)
        val notification = NotificationCompat.Builder(this, ALERT_CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(resourceId)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()
    
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(code.hashCode(), notification)
    
        Log.d("ForegroundService", "Notification sent: title=$title, message=$message")
    }
    

    private fun sendEventToReactNative(data: Map<String, Any?>) {
        val reactContext = (application as MainApplication).reactNativeHost.reactInstanceManager.currentReactContext
        reactContext?.let {
            try {
                val writableMap = Arguments.createMap()
                data.forEach { (key, value) ->
                    when (value) {
                        is String -> writableMap.putString(key, value)
                        is Boolean -> writableMap.putBoolean(key, value)
                        is Int -> writableMap.putInt(key, value)
                        is Double -> writableMap.putDouble(key, value)
                        is Float -> writableMap.putDouble(key, value.toDouble())
                    }
                }
                it.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("UserStateUpdate", writableMap)
            } catch (e: Exception) {
                Log.e("ForegroundService", "Error sending event to React Native", e)
            }
        }
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        super.onTaskRemoved(rootIntent)
        restartService()
    }

    override fun onDestroy() {
        super.onDestroy()
        try {
            unregisterReceiver(networkChangeReceiver)
        } catch (e: IllegalArgumentException) {
            Log.w("ForegroundService", "Receiver already unregistered")
        }
        handler.removeCallbacksAndMessages(null)
        restartService()
    }

    private fun restartService() {
        val restartServiceIntent = Intent(applicationContext, ForegroundService::class.java).apply {
            setPackage(packageName)
        }
        val restartServicePendingIntent = PendingIntent.getService(
            this, 1, restartServiceIntent, PendingIntent.FLAG_IMMUTABLE
        )
        val alarmManager = getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarmManager.set(
            AlarmManager.ELAPSED_REALTIME,
            SystemClock.elapsedRealtime() + 1000,
            restartServicePendingIntent
        )
    }

    override fun onBind(intent: Intent?): IBinder? = null
}

