<script setup lang="ts">
import { UploadFileInfo, useMessage } from 'naive-ui'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authorization, ensureLogin, getInfo, InfoData, Response, changeInfo } from '../../common/api_login'
import { baseFileURL, uploadURL } from '../../common/api_upload'
import TitleBar from '../../components/TitleBar.vue'

ensureLogin()
const router = useRouter()
const message = useMessage()
const token = localStorage.getItem('token')
const info = reactive<InfoData>({ id: -1, age: -1, avatar: '', name: '', password: '123456', sex: '男', signature: '', telephone: '', birth: '1000-10-10' })
const birthSecond = computed({
  get() {
    const date = new Date(info.birth)
    return date.getTime()
  },
  set(v: number) {
    const date = new Date(v)
    info.birth = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
})
getInfo().then(res => {
  for (const k of Object.keys(res.data.data)) {
    // @ts-ignore
    info[k] = res.data.data[k]
  }
})

function uploadFinish(res: { file: UploadFileInfo, event?: any }) {
  console.log(res)
  const response = JSON.parse(res.event.target.responseText) as Response<string>
  message.success('上传：' + response.msg)
  const avatarSrc =baseFileURL + response.data
  info.avatar = avatarSrc
  return undefined
}

function save() {
  changeInfo(info).then(res => {
    if (res.data.code === 0) {
      message.success(res.data.msg)
      router.back()
    }
    else message.error(JSON.stringify(res.data) )
  })
}
</script>
<template>
  <TitleBar name="编辑资料" @back="router.back()"></TitleBar>
  <div class="text-lg mx-4">
    <div class="flex h-10 items-center">
      <div class="min-w-14">头像：</div>
      <NUpload
        :action="uploadURL"
        :headers="{ ...authorization(token).headers }"
        accept="image/*"
        :show-file-list="false"
        @finish="uploadFinish"
      >
        <NAvatar circle size="large" :src="info.avatar"></NAvatar>
      </NUpload>
    </div>
    <div class="flex h-10 items-center">
      <div class="min-w-14">名称：</div>
      <NInput v-model:value="info.name"></NInput>
    </div>
    <div class="flex h-10 items-center">
      <div class="min-w-14">个签：</div>
      <NInput v-model:value="info.signature"></NInput>
    </div>
    <div class="flex h-10 items-center">
      <div class="min-w-14">生日：</div>
      <NDatePicker v-model:value="birthSecond"></NDatePicker>
    </div>
  </div>
  <div class="mx-2 mt-2">
    <NButton type="primary" block @click="save">保存</NButton>
  </div>
</template>
