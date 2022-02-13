package com.hearu.hearu

import android.annotation.SuppressLint
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.webkit.*
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.webkit.WebViewAssetLoader
import java.util.*


class MainActivity : AppCompatActivity() {

    private var time = 0L
    private var filePathCallback: ValueCallback<Array<Uri>>? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        toast = Toast.makeText(this, "", Toast.LENGTH_SHORT)
        setContentView(R.layout.activity_main)
        val domain = "qingcheng.asia"
        val assetLoader = WebViewAssetLoader.Builder().setHttpAllowed(true).setDomain(domain).addPathHandler(
            "/assets/",
            WebViewAssetLoader.AssetsPathHandler(this)
        ).build()
        val launchChooser = registerForActivityResult(ActivityResultContracts.OpenMultipleDocuments()) {
            filePathCallback?.onReceiveValue(it?.toTypedArray())
        }
        findViewById<WebView>(R.id.wv_main).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView?,
                    request: WebResourceRequest?
                ): WebResourceResponse? {
                    return request?.let { assetLoader.shouldInterceptRequest(it.url) }
                }
            }
            webChromeClient = object : WebChromeClient() {
                override fun onConsoleMessage(message: String, lineNumber: Int, sourceID: String) {
                    Log.d("Hearu", "$message -- From line $lineNumber of $sourceID")
                }

                override fun onShowFileChooser(
                    webView: WebView?,
                    filePathCallback: ValueCallback<Array<Uri>>?,
                    fileChooserParams: FileChooserParams?
                ): Boolean {
                    this@MainActivity.filePathCallback = filePathCallback
                    launchChooser.launch(fileChooserParams?.acceptTypes)
                    return true
                }
            }
            addJavascriptInterface(JavaScriptInterface(this@MainActivity), "Android")
            loadUrl("https://${domain}/assets/index.html")
        }
    }

    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        val webView = findViewById<WebView>(R.id.wv_main)
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            arrayOf("/login", "/nav/main", "/nav/shop", "/nav/me", "/nav/community").forEach {
                if (webView.url?.contains(it) == true) {
                    if (Date().time - time < 2000) {
                        toast?.cancel()
                        finish()
                    } else {
                        time = Date().time
                        showToast("再按一次退出应用")
                    }
                    return true
                }
            }
            if (webView.canGoBack()) webView.goBack()
            return true
        }
        return super.onKeyUp(keyCode, event)
    }

    override fun onDestroy() {
        toast = null
        super.onDestroy()
    }
}

var toast: Toast? = null
fun showToast(text: CharSequence, duration: Int = Toast.LENGTH_SHORT) {
    if (toast == null) throw NullPointerException("toast dose not init")
    toast?.setText(text)
    toast?.duration = duration
    toast?.show()
}