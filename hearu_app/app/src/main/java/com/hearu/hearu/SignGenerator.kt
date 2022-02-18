package com.hearu.hearu

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.util.Pair
import android.webkit.WebView
import com.huawei.hms.signpal.*
import com.huawei.hms.signpal.SignGenerator
import java.util.*

object SignGenerator {
    var signGenerator: SignGenerator? = null

    inline fun initSignGenerator(crossinline onData: (String, String) -> Unit) {
        val setting = GeneratorSetting()
            .setLanguage(GeneratorConstants.CN_CSL)
        signGenerator = SignGenerator(setting)
        signGenerator?.setCallback(object : GeneratorCallback {
            override fun onEvent(taskId: String, eventId: Int, bundle: Bundle?) {
                when (eventId) {
                    GeneratorConstants.EVENT_START -> {
                        Log.i("mysign", "start")
                    }
                    GeneratorConstants.EVENT_DOWNLOADING -> {
                        Log.i("mysign", "downloading")
                    }
                    GeneratorConstants.EVENT_STOP -> {
                        val isInterrupted =
                            bundle?.getBoolean(GeneratorConstants.EVENT_STOP_INTERRUPTED)
                        Log.i("mysign", "isInterrupted:$isInterrupted")
                    }
                    else -> {}
                }
            }

            override fun onSignDataAvailable(
                taskId: String?,
                signFragment: SignMotionFragment?,
                range: Pair<Int, Int>?,
                bundle: Bundle?
            ) {
                val motionDataList = signFragment?.getSignMotionDataArray()
                val faceArr = signFragment?.getFaceMotion()
                onData(Arrays.toString(motionDataList), Arrays.toString(faceArr))
                Log.i("mysign", Arrays.toString(faceArr))
                signFragment?.getSignMotionDataMap()?.forEach {
                    Log.i("mysign",Arrays.toString(it["LeftHandThumb3"]))
                }
            }

            override fun onError(taskId: String, err: SignPalError) {
                Log.e("mysign", err.errorMsg)
                Log.e("mysign", "" + err.errorId)
            }

            override fun onWarning(taskId: String, warning: SignPalWarning) {
                Log.w("mysign", warning.warningMsg)
            }
        })
    }
}