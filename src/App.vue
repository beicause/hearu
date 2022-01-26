<script setup lang="ts">
import { GlobalThemeOverrides } from 'naive-ui'

const theme: GlobalThemeOverrides = {
  common:{
    primaryColor:'#2196f3',
    primaryColorHover:'#56aff6',
    primaryColorPressed:'#0d8df2'
  }
}
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

