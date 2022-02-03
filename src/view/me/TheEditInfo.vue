<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ensureLogin, getInfo, InfoData } from '../../common/api_login'
import TitleBar from '../../components/TitleBar.vue'

ensureLogin()
const router = useRouter()
const info = reactive<InfoData>({ id: -1, age: -1, avatar: '', name: '', password: '', sex: '男', signature: '', telephone: '', birth: '1000-10-10' })
const birthSecond = computed({
  get() {
    const date = new Date(info.birth)
    return date.getTime()
  },
  set(v:number){
    const date=new Date(v)
    info.birth = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }
})
getInfo().then(res => {
  for (const k of Object.keys(res.data.data)) {
    // @ts-ignore
    info[k] = res.data.data[k]
  }
})
</script>
<template>
  <TitleBar name="编辑资料" @back="router.back()"></TitleBar>
  <div class="text-lg mx-4">
    <div class="flex h-10 items-center">
      <div class="min-w-14">头像：</div>
      <NUpload accept="image/*" :show-file-list="false"><NAvatar circle size="large" :src="info.avatar"></NAvatar></NUpload>
    </div>
    <div class="flex h-10 items-center">
      <div class="min-w-14">昵称：</div>
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
</template>
