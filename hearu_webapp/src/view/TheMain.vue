<script lang="ts" setup>
import { ref } from 'vue'
import { InputInst } from 'naive-ui'
// @ts-ignore
import Search from '~icons/bi/search'
// @ts-ignore
import Newspaper from '~icons/ri/newspaper-line'
// @ts-ignore
import Windmill from '~icons/tabler/windmill'
// @ts-ignore
import GolfCourse from '~icons/ic/baseline-golf-course'
// @ts-ignore
import DynamicFeed from '~icons/ic/baseline-dynamic-feed'

import IconButton from '../components/IconVertButton.vue'

const isSearch = ref(false)
const inputSearch = ref<InputInst | null>(null)
const carouselImages = [
  'http://www.cndcm.cn/uploadfile/2021/0308/20210308095808395.jpg',
  'http://www.cndcm.cn/uploadfile/2018/0428/20180428061724645.jpg',
  'http://www.cndcm.cn/uploadfile/2021/0930/20210930110240199.jpg',
  'http://www.cndcm.cn/uploadfile/2021/0413/20210413041025742.jpg',
  'http://www.cndcm.cn/uploadfile/2020/0907/20200907101943945.jpg'
]

const news = [
  '江苏聋人协会举办了首届“手说江苏”手语大赛',
  '“声动指尖，芳华青春”聋人主播海选大赛正式启动',
  '手语律师9年为10万聋哑人打官司：他们在“真空”环境里长大，有了解才能避免错误',
  '听力残疾=言语障碍？请别再叫我们“聋哑人”',
]
</script>
<template>
  <div class="mx-2">
    <NInputGroup class="top-2 fixed z-1 w-auto left-2 right-2">
      <NInput
        ref="inputSearch"
        placeholder="零基础学手语"
        @keyup.enter="inputSearch && inputSearch.blur()"
        @blur="isSearch = false"
        @focus="isSearch = true"
      >
        <template #prefix>
          <Search />
        </template>
      </NInput>
      <NButton v-show="isSearch">取消</NButton>
    </NInputGroup>
    <NCarousel autoplay class="pt-12">
      <img v-for="(src, index) in carouselImages" :key="index" class="carousel-img" :src="src" />
    </NCarousel>
    <div class="mt-1 flex justify-center">
      <IconButton class="bg-blue-500 text-white">
        <template #icon>
          <Newspaper class="icon-size" />
        </template>
        新闻资讯
      </IconButton>
      <IconButton class="bg-red-400 text-white">
        <template #icon>
          <Windmill class="icon-size" />
        </template>
        活动中心
      </IconButton>
      <IconButton class="bg-green-400 text-white">
        <template #icon>
          <GolfCourse class="icon-size" />
        </template>
        最新课程
      </IconButton>
      <IconButton class="bg-yellow-400 text-white">
        <template #icon>
          <DynamicFeed class="icon-size" />
        </template>
        社区动态
      </IconButton>
    </div>
    <NH6 class="my-0 pb-1 flex justify-between items-center" prefix="bar">
      <span>推荐阅读</span>
      <NButton ghost type="primary" :bordered="false">>></NButton>
    </NH6>
    <div class="flex flex-col">
      <NEllipsis
        v-for="(_news, index) in news"
        :key="index"
        class="pt-1"
        :tooltip="false"
      >
        {{ _news }}
      </NEllipsis>
    </div>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 345px;
  height: 175px;
  border-radius: 12px;
}

.icon-size {
  width: 24px;
  height: 24px;
}
</style>
