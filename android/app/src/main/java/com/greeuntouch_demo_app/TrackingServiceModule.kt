package com.greeuntouch_demo_app

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.greeuntouch_demo_app.TrackingService
class TrackingServiceModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TrackingServiceModule"
    }

    @ReactMethod
    fun startService(promise: Promise) {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, TrackingService::class.java)
            context.startForegroundService(intent) // Foreground Service 시작
            promise.resolve("Service started successfully")
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to start service: ${e.message}")
        }
    }

    @ReactMethod
    fun stopService(promise: Promise) {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, TrackingService::class.java)
            context.stopService(intent) // Foreground Service 중지
            promise.resolve("Service stopped successfully")
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to stop service: ${e.message}")
        }
    }

    /**
     * React Native로 이벤트 전송
     */
    fun sendEventToReact(eventName: String, params: String) {
        try {
            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (e: Exception) {
            Log.e("TrackingServiceModule", "Failed to send event: ${e.message}")
        }
    }
}
