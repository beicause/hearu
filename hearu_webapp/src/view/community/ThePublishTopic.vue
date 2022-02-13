<script setup lang="ts">
import { UploadFileInfo, useMessage } from 'naive-ui'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { authorization } from '../../common/api_login'
import TitleBar from '../../components/TitleBar.vue'
import { uploadURL } from '../../common/api_upload'
import { publish } from '../../common/api_topic'

const router = useRouter()
const token = localStorage.getItem('token')
const title = ref(localStorage.getItem('publish_topic_title') || '')
const content = ref(localStorage.getItem('publish_topic_content') || '')
const message = useMessage()
const sources = ref([] as UploadFileInfo[])

watchEffect(() => {
  localStorage.setItem('publish_topic_title', title.value)
  localStorage.setItem('publish_topic_content', content.value)
})
function updateFile(files: UploadFileInfo[]) {
  sources.value = files
}
function uploadFinish(res: { file: UploadFileInfo, event?: any }) {
  const response = JSON.parse(res.event.target.responseText)
  res.file.url = response.data
  return undefined
}

function publishTopic() {
  publish(title.value, '__SRC' + JSON.stringify(sources.value.map(src => {
    const res = { url: src.url,type:src.type }
    return res
  })) + 'SRC__' + content.value).then(res => {
    if (res.data.code === 0) {
      message.success(res.data.msg)
      router.back()
    } else message.error(res.data.msg)
  }).catch(err => {
    message.error(err)
  })
}
</script>
<template>
  <TitleBar name="写话题" @back="router.back()">
    <div class="flex-grow flex justify-end">
      <NButton
        type="primary"
        ghost
        size="small"
        class="mr-2"
        @click="publishTopic"
      >
        发布
      </NButton>
    </div>
  </TitleBar>

  <div class="mx-2">
    <NInput v-model:value="title" placeholder="请输入标题" size="large"></NInput>
  </div>
  <div class="my-1 mx-2 h-50">
    <NInput
      v-model:value="content"
      placeholder="请输入内容"
      type="textarea"
      size="large"
      class="h-full"
    ></NInput>
  </div>
  <NUpload
    class="mb-10 mx-2"
    list-type="image-card"
    :action="uploadURL"
    :headers="{ ...authorization(token).headers }"
    accept="image/*, video/*"
    :file-list="sources"
    multiple
    @update-file-list="updateFile"
    @finish="uploadFinish"
  >
    选择图片
  </NUpload>
</template>
