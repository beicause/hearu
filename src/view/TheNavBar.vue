<script setup lang="ts">
import { useRouter } from 'vue-router'
// @ts-ignore
import FaSolidHome from '~icons/fa-solid/home'
// @ts-ignore
import BxBxsBookBookmark from '~icons/bx/bxs-book-bookmark'
// @ts-ignore
import IonPlanet from '~icons/ion/planet'
// @ts-ignore
import BiPersonCircle from '~icons/bi/person-circle'
// @ts-ignore
import BiCameraFill from '~icons/bi/camera-fill'
import { DefineComponent, h, VNode } from 'vue'

const router = useRouter()
const IconText = (icon: DefineComponent, text: string | VNode) =>
  h('div', { class: 'flex flex-col items-center' }, [
    h(icon, { class: 'text-2xl' }), text
  ])
</script>

<template>
  <router-view v-slot="{ route, Component }">
    <!-- 使用任何自定义过渡和回退到 `fade` -->
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
  <div class="absolute flex justify-around items-center bottom-0 left-0 right-0">
    <NButton class="h-10" :bordered="false" @click="router.push('/nav/main')">
      <component :is="IconText(FaSolidHome, '首页')"></component>
    </NButton>
    <NButton class="h-10" :bordered="false" @click="router.push('/nav/course')">
      <component :is="IconText(BxBxsBookBookmark, '课程')"></component>
    </NButton>
    <NButton class="h-15 w-15" circle type="primary" @click="router.push('/nav/main')">
      <component :is="IconText(BiCameraFill, h('span',{class:'text-xs'},'在线翻译'))"></component>
    </NButton>
    <NButton class="h-10" :bordered="false" @click="router.push('/nav/community')">
      <component :is="IconText(IonPlanet, '社区')"></component>
    </NButton>
    <NButton class="h-10" :bordered="false" @click="router.push('/nav/me')">
      <component :is="IconText(BiPersonCircle, '我的')"></component>
    </NButton>
  </div>
</template>
