<script setup lang="ts">
import { GlobalThemeOverrides } from 'naive-ui'
import { useRouter } from 'vue-router'

const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2196f3',
    primaryColorHover: '#56aff6',
    primaryColorPressed: '#0d8df2'
  }
}

const isLogin = true
const router = useRouter()

if (isLogin) {
  router.replace('/nav/main')
}
else {
  router.replace('/login')
}
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NMessageProvider>
      <NDialogProvider>
        <router-view v-slot="{ Component, route }">
          <!-- 使用任何自定义过渡和回退到 `fade` -->
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </transition>
        </router-view>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

