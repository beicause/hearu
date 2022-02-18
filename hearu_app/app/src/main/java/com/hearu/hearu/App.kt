package com.hearu.hearu

import android.app.Application
import android.os.Bundle
import android.util.Log
import android.util.Pair
import com.huawei.hms.signpal.*
import com.huawei.hms.signpal.common.agc.SignPalApplication
import java.util.*


class App : Application() {
    override fun onCreate() {
        super.onCreate()
        SignPalApplication.getInstance()
            .setApiKey("DAEDAFFUQ8Poj5Ur3xIJil+3GpvuO4NqNmUQYMX/nMFG5G2f4yoT0qRbWddoh/wi8mKikPAogh2jVtlg3jsVbRj4We/nT19EYkmrww==")
    }
}