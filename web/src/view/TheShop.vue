<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import InputSearch from '../components/InputSearch.vue'

const router = useRouter()
const tab = ref('course')

watch(tab, v => {
  router.push('/nav/shop/' + v)
})
</script>
<template>
  <div class="flex justify-between items-center left-4 right-4 fixed">
    <NTabs v-model:value="tab" size="large">
      <NTab name="course">课程</NTab>
      <NTab name="thing">用品</NTab>
    </NTabs>
    <InputSearch placeholder="搜索课程/商品"></InputSearch>
  </div>
  <div class="h-11"></div>
  <router-view></router-view>
</template>
