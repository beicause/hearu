package com.hearu.hearu

import android.app.UiModeManager
import android.content.Context
import android.webkit.JavascriptInterface


class JavaScriptInterface(val context: Context) {
    @JavascriptInterface
    fun getTheme():String{
        val uiModeManager = context.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager
        return if(uiModeManager.nightMode==UiModeManager.MODE_NIGHT_YES)"dark" else "light"
    }
}