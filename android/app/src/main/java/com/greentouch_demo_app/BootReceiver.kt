package com.greentouch_demo_app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import android.os.Build
import com.greentouch_demo_app.foregroundService.ForegroundService


class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            Log.d("BootReceiver", "Device booted, starting service...")

            val serviceIntent = Intent(context, ForegroundService::class.java)

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                // Android 8.0 이상에서는 Foreground Service로 실행해야 함
                context.startForegroundService(serviceIntent)
            } else {
                // Android 8.0 미만에서는 일반 서비스로 실행 가능
                context.startService(serviceIntent)
            }
        }
    }
}
