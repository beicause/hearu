package com.hearu.hearu

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader


class MainActivity : AppCompatActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val assetLoader = WebViewAssetLoader.Builder().addPathHandler("/assets/",
            WebViewAssetLoader.AssetsPathHandler(this)).build()
        findViewById<WebView>(R.id.wv_main).apply {
            settings.javaScriptEnabled=true
            settings.domStorageEnabled=true
            webViewClient=object :WebViewClient(){
                override fun shouldInterceptRequest(
                    view: WebView?,
                    request: WebResourceRequest?
                ): WebResourceResponse? {
                    return request?.let { assetLoader.shouldInterceptRequest(it.url) }?:super.shouldInterceptRequest(view, request)
                }
            }
            loadUrl("https://appassets.androidplatform.net/assets/index.html")
        }
    }
}