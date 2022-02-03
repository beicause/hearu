<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import TitleBar from '../../components/TitleBar.vue'

const router = useRouter()
const title = ref(localStorage.getItem('publish_topic_title') || '')
const content = ref(localStorage.getItem('publish_topic_content') || '')

watchEffect(() => {
  localStorage.setItem('publish_topic_title', title.value)
  localStorage.setItem('publish_topic_content', content.value)
})
</script>
<template>
  <div class="flex flex-col h-full">
    <TitleBar name="写话题" @back="router.back()">
      <div class="flex-grow flex justify-end">
        <NButton type="primary" ghost size="small" class="mr-2">发布</NButton>
      </div>
    </TitleBar>

    <div class="mx-2">
      <NInput v-model:value="title" placeholder="请输入标题" size="large"></NInput>
    </div>
    <div class="mt-1 mb-4 mx-2 flex-grow">
      <NInput
        v-model:value="content"
        placeholder="请输入内容"
        type="textarea"
        size="large"
        class="h-full"
      ></NInput>
    </div>
  </div>
</template>
