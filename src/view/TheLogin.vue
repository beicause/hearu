<script setup lang="ts">
import ChevronDown from '~icons/akar-icons/chevron-down'
import { useRouter } from 'vue-router'
import { hash, login, register } from '../common/login'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const isRegister = ref(false)
const telephone = ref('')
const password = ref('')
const passwordConfirm = ref('')
const router = useRouter()
const message = useMessage()
function loginOrRegister() {
  if (isRegister.value && password.value != passwordConfirm.value)
    message.error('两次输入密码不一致')
  const _loginOrRegister = async () => {
    if (isRegister.value)
     return await register({
        name: telephone.value,
        telephone: telephone.value,
        password: hash(password.value),
        sex: '男', birth: '1000-10-10', avatar: '', signature: ''
      })
    else return await login({ telephone: telephone.value, password: hash(password.value) })
  }
  _loginOrRegister().then((res:any) => {
    localStorage.setItem('token',res.data.data.token)
    router.replace({ name: 'main' })
  }
  ).catch(err => {
    message.error(err||'出错了')
  })
}
</script>

<template>
  <div class="mx-2 mt-15">
    <NH1 class="flex justify-between">
      欢迎使用HearU
      <NButton text type="primary">>企业入口</NButton>
    </NH1>
    <NInput v-model:value="telephone" placeholder="请输入手机号" size="large" clearable>
      <template #prefix>
        <div class="w-11 flex items-center">
          +86
          <ChevronDown />
        </div>
      </template>
    </NInput>
    <NInput
      v-model:value="password"
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
    <transition name="slide">
      <NInput
        v-if="isRegister"
        v-model:value="passwordConfirm"
        class="mt-2"
        placeholder="请再次确认密码"
        size="large"
        type="password"
        clearable
      >
        <template #prefix>
          <div class="w-11">确认</div>
        </template>
      </NInput>
    </transition>

    <NButton
      class="mt-3"
      size="large"
      type="primary"
      block
      @click="loginOrRegister"
    >
      {{ isRegister ? '注册' : '登录' }}
    </NButton>
    <div class="flex justify-between mt-2">
      <NButton text>忘记密码</NButton>
      <NButton
        text
        type="primary"
        @click="isRegister = !isRegister"
      >
        {{ isRegister ? '返回登录' : '注册账号' }}
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-from {
  transform: scale(0);
}

.slide-enter-to {
  transform: scale(1);
}
.slide-enter-active {
  transition: transform 0.8s ease;
}

.slide-leave-from {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}
.slide-leave-active {
  transition: opacity 0.5s ease;
}
</style>
