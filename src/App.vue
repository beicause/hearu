<script setup lang="ts">
import { GlobalThemeOverrides,zhCN,dateZhCN } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { themeObject } from './common/state'
const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2196f3',
    primaryColorHover: '#56aff6',
    primaryColorPressed: '#0d8df2'
  }
}

const isLogin = ref(false)
const router = useRouter()

watch(isLogin, (login) => {
  if (login) {
    router.replace('/nav/main')
  }
  else {
    router.replace('/login')
  }
})

if (localStorage.getItem('token'))
  isLogin.value = true

</script>

<template>
  <NConfigProvider :theme="themeObject" :theme-overrides="theme" :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <NDialogProvider>
        <NLayout position="absolute"><router-view></router-view></NLayout>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

