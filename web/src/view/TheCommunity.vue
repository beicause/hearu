<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tab = ref('recommend')

watch(tab,v => {
  router.push('/nav/community/' + v)
})
</script>
<template>
  <div class="flex justify-between items-center left-4 right-4 fixed">
    <NTabs v-model:value="tab" size="large">
      <NTab name="recommend">推荐</NTab>
      <NTab name="community">社区</NTab>
      <NTab name="job">就业</NTab>
    </NTabs>
    <NButton type="primary" ghost size="small" @click="router.push('/publish_topic')">写话题</NButton>
  </div>
  <div class="h-11"></div>
  <router-view></router-view>
</template>
