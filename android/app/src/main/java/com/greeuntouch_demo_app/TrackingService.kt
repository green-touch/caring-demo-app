package com.greeuntouch_demo_app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import kotlinx.coroutines.*

class TrackingService : Service() {

    companion object {
        const val CHANNEL_ID = "tracking_service_channel"
        const val ALERT_CHANNEL_ID = "alert_service_channel"
    }

    private val scope = CoroutineScope(Dispatchers.IO)

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Tracking Service")
            .setContentText("Tracking user activity in the background")
            .setSmallIcon(R.drawable.logo_symbol) // 아이콘 설정
            .build()

        startForeground(1, notification)

        // 백그라운드 작업 시작
        startBackgroundTask()
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null // 바인딩 서비스가 X
    }

    override fun onDestroy() {
        super.onDestroy()
        scope.cancel() // Coroutine 작업 중단
    }

    /**
     * Notification Channels 생성
     */
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Tracking Service 채널
            val trackingChannel = NotificationChannel(
                CHANNEL_ID,
                "Tracking Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )

            // Alert 채널
            val alertChannel = NotificationChannel(
                ALERT_CHANNEL_ID,
                "Alert Service Channel",
                NotificationManager.IMPORTANCE_HIGH
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(trackingChannel)
            manager?.createNotificationChannel(alertChannel)
        }
    }

    /**
     * 백그라운드 작업 (배터리, 네트워크, 화면 상태 확인 및 알림 전송)
     */
    private fun startBackgroundTask() {
        scope.launch {
            while (true) {
                val batteryStatus = getBatteryStatus()
                val isConnected = isNetworkConnected()
                val isScreenOn = isScreenOn()

                val data = mapOf(
                    "batteryLevel" to batteryStatus["batteryLevel"],
                    "isCharging" to batteryStatus["isCharging"],
                    "networkConnected" to isConnected,
                    "screenOn" to isScreenOn
                )

                Log.d("TrackingService", "Collected data: $data")

                // React Native로 상태 업데이트 이벤트 전송
                (applicationContext as? MainApplication)?.trackingServiceModule?.sendEventToReact(
                    "onBackgroundUpdate",
                    data.toString() // JSON 형식으로 변환된 상태 데이터
                )

                // 알람 조건 확인 및 상세 상태 분류
                updateAndSendDetailedAlerts(batteryStatus, isConnected, isScreenOn)

                delay(10000) // 10초 간격으로 상태 업데이트
            }
        }
    }

    /**
     * 상태 업데이트 및 상세 알람 전송
     */
    private fun updateAndSendDetailedAlerts(
        batteryStatus: Map<String, Any>,
        isConnected: Boolean,
        isScreenOn: Boolean
    ) {
        val batteryLevel = batteryStatus["batteryLevel"] as Int
        val isCharging = batteryStatus["isCharging"] as Boolean

        var stateCode: String? = null
        var title: String? = null
        var message: String? = null

        // 배터리 상태 확인
        if (batteryLevel < 10 && !isCharging) {
            stateCode = "BAT-02"
            title = "Battery Critical"
            message = "Battery level is $batteryLevel%. Please charge immediately."
        } else if (batteryLevel < 20 && !isCharging) {
            stateCode = "BAT-01"
            title = "Battery Low"
            message = "Battery level is $batteryLevel%. Please charge soon."
        }

        // 네트워크 상태 확인
        if (!isConnected) {
            stateCode = if (batteryLevel < 10) "NET-04" else "NET-02"
            title = "Network Disconnected"
            message = "No internet connection. Please reconnect."
        }

        // 화면 상태 확인
        if (!isScreenOn) {
            val screenOffDuration = calculateScreenOffDuration()
            if (screenOffDuration >= 120000) { // 2분 이상 꺼짐
                stateCode = "SCR-02"
                title = "Screen Off Too Long"
                message = "Screen has been off for over 2 minutes."
            } else if (screenOffDuration >= 60000) { // 1분 이상 꺼짐
                stateCode = "SCR-01"
                title = "Screen Off Warning"
                message = "Screen has been off for over 1 minute."
            }
        }

        // 알림 전송
        if (stateCode != null && title != null && message != null) {
            sendAlertNotification(title, message)
        }
    }

    /**
     * 네이티브 알림 전송
     */
    private fun sendAlertNotification(title: String, content: String) {
        val notification: Notification = NotificationCompat.Builder(this, ALERT_CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(content)
            .setSmallIcon(R.drawable.logo_symbol)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()

        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.notify(System.currentTimeMillis().toInt(), notification) // 알림 ID를 현재 시간으로 설정
    }

    /**
     * 화면 꺼짐 지속 시간 계산
     */
    private fun calculateScreenOffDuration(): Long {
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        return if (!powerManager.isInteractive) {
            System.currentTimeMillis() - (System.currentTimeMillis() - 10000) // 예시 값
        } else {
            0
        }
    }

    /**
     * 배터리 상태 확인
     */
    private fun getBatteryStatus(): Map<String, Any> {
        val batteryIntent: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { filter ->
            applicationContext.registerReceiver(null, filter)
        }

        val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
        val batteryPct = (level / scale.toFloat() * 100).toInt()

        val isCharging = when (batteryIntent?.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1)) {
            BatteryManager.BATTERY_PLUGGED_USB, BatteryManager.BATTERY_PLUGGED_AC -> true
            else -> false
        }

        return mapOf(
            "batteryLevel" to batteryPct,
            "isCharging" to isCharging
        )
    }

    /**
     * 네트워크 연결 상태 확인
     */
    private fun isNetworkConnected(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(android.net.NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    /**
     * 화면 상태 확인
     */
    private fun isScreenOn(): Boolean {
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT_WATCH) {
            powerManager.isInteractive
        } else {
            @Suppress("DEPRECATION")
            powerManager.isScreenOn
        }
    }
}