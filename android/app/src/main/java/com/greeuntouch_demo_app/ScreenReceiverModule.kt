package com.greentouch_admin_app

import android.content.Context
import android.os.PowerManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ScreenReceiverModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenReceiverModule" // JS에서 사용할 모듈 이름
    }

    @ReactMethod
    fun isScreenOn(promise: Promise) {
        try {
            val powerManager = reactApplicationContext.getSystemService(Context.POWER_SERVICE) as PowerManager
            val isInteractive = powerManager.isInteractive
            promise.resolve(isInteractive) // JS로 true/false 반환
        } catch (e: Exception) {
            promise.reject("POWER_MANAGER_ERROR", "Failed to check screen status", e)
        }
    }
}
