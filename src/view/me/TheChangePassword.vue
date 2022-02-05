<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { changePassword, hash } from '../../common/api_login'
import TitleBar from '../../components/TitleBar.vue'

const router = useRouter()
const password = ref('')
const passwordNew = ref('')
const passwordConfirm = ref('')
const message = useMessage()
function _changePassword() {
  changePassword(hash(password.value), hash(passwordNew.value)).then(res => {
    if (res.data.code === 0) {
      message.success(res.data.msg)
      router.back()
    }
    else message.error(res.data.msg)
  }).catch(err => {
    message.error(err )
  })
}
</script>
<template>
  <TitleBar name="修改密码" @back="router.back()"></TitleBar>
  <div class="mx-2">
    <NInput
      v-model:value="password"
      placeholder="请输入原密码"
      size="large"
      type="password"
      clearable
    >
      <template #prefix>
        <div class="w-15">原密码</div>
      </template>
    </NInput>
    <NInput
      v-model:value="passwordNew"
      class="mt-2"
      placeholder="请输入新密码"
      size="large"
      type="password"
      clearable
    >
      <template #prefix>
        <div class="w-15">新密码</div>
      </template>
    </NInput>
    <NInput
      v-model:value="passwordConfirm"
      class="mt-2"
      size="large"
      type="password"
      placeholder="请再次确认新密码"
      clearable
    >
      <template #prefix>
        <div class="w-15">确认密码</div>
      </template>
    </NInput>
    <NButton
      class="mt-3"
      size="large"
      type="primary"
      block
      @click="_changePassword"
    >
      确定
    </NButton>
  </div>
</template>
