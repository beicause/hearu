<script setup lang="ts">
import { useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import { theme } from '../../common/state'
import IconArrow from '../../components/IconArrow.vue'
import TitleBar from '../../components/TitleBar.vue'

const dialog = useDialog()
const router = useRouter()

const optionText = {
  positiveText: '确定',
  negativeText: '取消'
}
function logout() {
  dialog.warning({
    title: '退出',
    content: '确定退出登录吗？',
    ...optionText,
    onPositiveClick() {
      localStorage.removeItem('token')
      router.replace('/login')
    }
  })
}

function clearCache() {
  dialog.warning({
    title: '清除缓存',
    content: '确定清除缓存吗?',
    ...optionText,
    onPositiveClick() {
      const token = localStorage.getItem('token')
      localStorage.clear()
      localStorage.setItem('token', token!)
    }
  })
}

const items: { name: string, click: () => void }[] = [
  { name: '切换主题', click() { theme.value= theme.value==='dark'?'light':'dark' } },
  { name: '编辑资料', click() { router.push('/edit_info') } },
  { name: '修改密码', click() { router.push('/change_password') } },
  { name: '隐私政策', click() { } },
  { name: '清除缓存', click: clearCache },
  { name: '退出登录', click: logout }
]
</script>

<template>
  <div>
    <TitleBar name="设置" @back="router.back()"></TitleBar>
    <NButton
      v-for="item in items"
      :key="item.name"
      block
      :bordered="false"
      @click="item.click"
    >
      <div class="flex justify-between items-center w-screen px-6">
        <span class="text-lg">{{ item.name }}</span>
        <IconArrow type="right" />
      </div>
    </NButton>
  </div>
</template>
