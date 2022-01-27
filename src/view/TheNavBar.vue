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
import IconButton from '../components/IconButton.vue'
import { h, ref } from 'vue'
import { NButton, useThemeVars } from 'naive-ui'

const colorPressed = useThemeVars().value.primaryColorPressed
const router = useRouter()
const route = useRoute()
const activeNav = ref(route.name)
const renderBar = (text: string, icon: any, nav: string) =>
  h(NButton, {
    class: 'h-10',
    bordered: false, onClick: () => { router.push(nav); activeNav.value = nav }
  }, () =>
    h(IconButton, null, { icon: () => h(icon, { class: 'text-2xl' }), default: () => text })
  )
</script>

<template>
  <router-view></router-view>
  <div class="absolute flex justify-around items-center bottom-0 left-0 right-0">
    <component :is="renderBar('首页', Home, 'main')"></component>
    <component :is="renderBar('商城', Shop, 'shop')"></component>
    <NButton class="h-15 w-15" circle type="primary" @click="router.push('/nav/translation')">
      <IconButton>
        <template #icon>
          <Camera class="text-2xl" />
        </template>
        <span class="text-xs">在线翻译</span>
      </IconButton>
    </NButton>
    <component :is="renderBar('社区', Planet, 'community')"></component>
    <component :is="renderBar('我的', Person, 'me')"></component>
  </div>
</template>
