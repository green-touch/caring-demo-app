package com.greentouch_demo_app.foregroundService

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.util.Log


class NetworkChangeReceiver(private val service: ForegroundService) : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null) return

        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork
        val networkCapabilities = connectivityManager.getNetworkCapabilities(network)
        val isConnected = networkCapabilities?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) == true

        Log.d("NetworkChangeReceiver", "Network connected: $isConnected")
        if (isConnected) {
            service.startTrackingUserState() // 서비스 상태 갱신
        }
    }
}
