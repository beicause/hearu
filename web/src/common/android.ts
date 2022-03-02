import axios, { AxiosResponse } from "axios"

export const Android = (window as any).Android as {
  getTheme(): 'dark' | 'night',
  getVersion(): string,
  writeClipboard(str: string): void
  text2sign(text:string):void
} | undefined

export const Version = { code: '', name: '' }

export const DOWNLOAD_URL = 'https://qingcheng.asia/hearu/app-release.apk'
export async function getAppUpdate(): Promise<AxiosResponse<typeof Version & { info: string }>> {
  return await axios.get(DOWNLOAD_URL.replace('.apk', '.json'))
}


import { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider"
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider"

export function checkAppUpdateDialog(force = false, message:MessageApiInjection,dialog:DialogApiInjection) {
  getAppUpdate().then(res => {
    if (!force && localStorage.getItem('ignore_version') === res.data.code) return
    const isUpdate = Android && parseInt(res.data.code) > parseInt((JSON.parse(Android.getVersion()) as typeof Version).code)
    if (isUpdate) {
      dialog.success({
        maskClosable: false,
        title: '发现新版本' + res.data.name, content: res.data.info, positiveText: '复制链接', negativeText: '忽略',
        onPositiveClick() {
          if (Android) {
            Android.writeClipboard(DOWNLOAD_URL)
            message.success('复制成功')
          }
          else navigator.clipboard.writeText(DOWNLOAD_URL).then(() => message.success('复制成功')).catch(err => message.error(err))
        },
        onNegativeClick() {
          localStorage.setItem('ignore_version', res.data.code)
        }
      })
    }
  }).catch(err=>console.log(err)
  )
}


