package com.greeuntouch_demo_app

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

class BatteryPackage : ReactPackage {
    override fun createNativeModules(reactContext: com.facebook.react.bridge.ReactApplicationContext): List<NativeModule> {
        return listOf(BatteryModule(reactContext))
    }

    override fun createViewManagers(reactContext: com.facebook.react.bridge.ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
