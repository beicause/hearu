<script setup lang="ts">
// @ts-ignore
import Setting from '~icons/ant-design/setting-filled'
// @ts-ignore
import Flower from '~icons/mdi/flower-outline'
// @ts-ignore
import ShoppingBasket from '~icons/fontisto/shopping-basket-add'
// @ts-ignore
import VipCrown from '~icons/ri/vip-crown-2-fill'
// @ts-ignore
import Message from '~icons/bx/bxs-message-detail'
// @ts-ignore
import Star from '~icons/ant-design/star-filled'
// @ts-ignore
import Bookmark from '~icons/bx/bxs-book-bookmark'
// @ts-ignore
import Help from '~icons/ic/round-help-center'
// @ts-ignore
import Info from '~icons/bx/bxs-info-square'
// @ts-ignore
import History from '~icons/lucide/history'
import { ref } from 'vue'
import IconButton from '../components/IconButton.vue'
import { ensureLogin, getInfo } from '../common/api_login'
import { useRouter } from 'vue-router'

ensureLogin()

const router = useRouter()
const avatarSrc = ref('')
const name = ref('')
const vip = ref('VIP')
const level = ref('LV1')

getInfo().then(res => {
  name.value = res.data.data.name
  avatarSrc.value = res.data.data.avatar
})


</script>

<template>
  <div class="flex items-center mt-10 ml-4">
    <NAvatar object-fit="cover" :src="avatarSrc" :size="72" round></NAvatar>
    <div class="flex flex-col flex-grow">
      <div class="text-2xl">{{ name }}</div>
      <div class="flex">
        <NTag type="warning">{{ vip }}</NTag>
        <NTag type="primary">{{ level }}</NTag>
      </div>
    </div>
    <NButton circle class="mr-4" @click="router.push('/setting')">
      <Setting class="text-2xl" />
    </NButton>
  </div>
  <div class="grid grid-cols-3 justify-items-center mt-2">
    <IconButton>
      <template #icon>
        <Flower class="icon-size text-red-500" />
      </template>小红花
    </IconButton>
    <IconButton>
      <template #icon>
        <ShoppingBasket class="icon-size text-yellow-500" />
      </template>积分商城
    </IconButton>
    <IconButton>
      <template #icon>
        <VipCrown class="icon-size text-yellow-400" />
      </template>会员中心
    </IconButton>
    <IconButton>
      <template #icon>
        <Message class="icon-size text-blue-400" />
      </template>我的消息
    </IconButton>
    <IconButton>
      <template #icon>
        <History class="icon-size text-purple-400" />
      </template>我的足迹
    </IconButton>
    <IconButton>
      <template #icon>
        <Star class="icon-size text-pink-400" />
      </template>我的收藏
    </IconButton>
    <IconButton>
      <template #icon>
        <Bookmark class="icon-size text-green-400" />
      </template>我的课程
    </IconButton>
    <IconButton>
      <template #icon>
        <Help class="icon-size text-yellow-300" />
      </template>使用帮助
    </IconButton>
    <IconButton>
      <template #icon>
        <Info class="icon-size text-blue-300" />
      </template>关于
    </IconButton>
  </div>
</template>

<style scoped>
.icon-size {
  width: 32px;
  height: 32px;
}
</style>
