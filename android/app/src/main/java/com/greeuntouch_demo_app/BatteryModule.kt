package com.greeuntouch_demo_app

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: Context = reactContext


    companion object {
        const val BATTERY_LEVEL_UNKNOWN = -1 // BatteryManager.EXTRA_LEVEL에서 반환되는 알 수 없는 값
        const val BATTERY_SCALE_UNKNOWN = -1 // BatteryManager.EXTRA_SCALE에서 반환되는 알 수 없는 값
        const val BATTERY_SCALE_MAX = 100 // 배터리 퍼센트 계산 기준 값
    }


    override fun getName(): String {
        return "BatteryModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val intentFilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            val batteryStatus = context.registerReceiver(null, intentFilter)

            // BatteryManager에서 레벨과 스케일 가져오기
            val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, BATTERY_LEVEL_UNKNOWN) ?: BATTERY_LEVEL_UNKNOWN
            val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, BATTERY_SCALE_UNKNOWN) ?: BATTERY_SCALE_UNKNOWN

            // 레벨이나 스케일이 알 수 없는 값이면 에러 처리
            if (level == BATTERY_LEVEL_UNKNOWN || scale == BATTERY_SCALE_UNKNOWN) {
                promise.reject("BATTERY_ERROR", "Unable to get battery level")
                return
            }

            // 퍼센트 계산
            val batteryPct = level * BATTERY_SCALE_MAX / scale.toFloat()
            promise.resolve(batteryPct)
        } catch (e: Exception) {
            promise.reject("BATTERY_ERROR", "Error getting battery level: ${e.message}")
        }
    }
}