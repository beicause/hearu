package com.hearu.hearu

import android.app.UiModeManager
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Build
import android.webkit.JavascriptInterface
import org.json.JSONObject


class JavaScriptInterface(val context: Context) {
    @JavascriptInterface
    fun getTheme():String{
        val uiModeManager = context.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager
        return if(uiModeManager.nightMode==UiModeManager.MODE_NIGHT_YES)"dark" else "light"
    }
    @JavascriptInterface
    fun getVersion():String{
        return context.packageManager.getPackageInfo(context.packageName, 0).let {
            val json = JSONObject()
            val versionCode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) it.longVersionCode else it.versionCode
            val versionName = it.versionName
            json.apply {
                put("name",versionName)
                put("code",versionCode)
            }.toString()
        }
    }
    @JavascriptInterface
    fun writeClipboard(str: String){
        val manager = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        manager.setPrimaryClip(ClipData.newPlainText(str,str))
    }
}