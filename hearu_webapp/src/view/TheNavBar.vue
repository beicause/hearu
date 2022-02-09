<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import Home from '~icons/fa-solid/home'
// @ts-ignore
import Shop from '~icons/teenyicons/shop-solid'
// @ts-ignore
import Planet from '~icons/ion/planet'
// @ts-ignore
import Person from '~icons/bi/person-circle'
// @ts-ignore
import Camera from '~icons/bi/camera-fill'
import IconDiv from '../components/IconVertDiv.vue'
import { h, ref } from 'vue'
import { NButton } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const activeNav = ref(route.name)
const renderBar = (text: string, icon: any, nav: string) =>
  h(NButton, {
    class: 'h-10',
    bordered: false, onClick: () => { router.push({ name: nav }); activeNav.value = nav }
  }, () =>
    h(IconDiv, null, { icon: () => h(icon, { class: 'text-2xl' }), default: () => text })
  )
</script>

<template>
  <router-view></router-view>
  <div class="absolute flex justify-around items-center bottom-0 left-0 right-0">
    <component :is="renderBar('首页', Home, 'main')"></component>
    <component :is="renderBar('商城', Shop, 'shop')"></component>
    <NButton class="h-15 w-15" circle type="primary" @click="router.push('/nav/translation')">
      <IconDiv>
        <template #icon>
          <Camera class="text-2xl" />
        </template>
        <span class="text-xs">在线翻译</span>
      </IconDiv>
    </NButton>
    <component :is="renderBar('社区', Planet, 'community')"></component>
    <component :is="renderBar('我的', Person, 'me')"></component>
  </div>
</template>
