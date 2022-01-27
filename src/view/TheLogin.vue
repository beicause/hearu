<script setup lang="ts">
// @ts-ignore
import AkarIconsChevronDown from '~icons/akar-icons/chevron-down'
import { useThemeVars } from 'naive-ui'
import { useRouter } from 'vue-router'

const primaryColor = useThemeVars().value.primaryColor
const router = useRouter()
function login() {
  router.replace('/main')
}
</script>

<template>
  <div class="mx-2 mt-15">
    <NH1>欢迎使用HearU</NH1>
    <NInput placeholder="请输入手机号" size="large" clearable>
      <template #prefix>
        <div class="w-11 flex items-center">
          +86
          <AkarIconsChevronDown></AkarIconsChevronDown>
        </div>
      </template>
    </NInput>
    <NInput
      class="mt-2"
      placeholder="请输入密码"
      size="large"
      type="password"
      clearable
    >
      <template #prefix>
        <div class="w-11">密码</div>
      </template>
    </NInput>
    <NButton
      class="mt-3"
      size="large"
      type="primary"
      block
      @click="login"
    >
      登录
    </NButton>
    <div class="flex justify-between mt-2">
      <NButton text>忘记密码</NButton>
      <NButton text :color="primaryColor">注册账号</NButton>
    </div>
  </div>
</template>
