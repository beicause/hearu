<script setup lang="ts">
import { GlobalThemeOverrides } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2196f3',
    primaryColorHover: '#56aff6',
    primaryColorPressed: '#0d8df2'
  }
}

const isLogin = ref(false)
const router = useRouter()

if (localStorage.getItem('token'))
  isLogin.value = true

watch(isLogin, (login) => {
  if (login) {
    router.replace('/nav/main')
  }
  else {
    router.replace('/login')
  }
})

</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NMessageProvider>
      <NDialogProvider>
        <router-view></router-view>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

