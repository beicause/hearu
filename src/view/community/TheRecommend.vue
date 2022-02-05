<script setup lang="ts">
import { ref } from 'vue'
import { CommentData, getComment, getTopic, like, TopicData, unlike } from '../../common/api_topic'
import { baseFileURL } from '../../common/api_upload'
// @ts-ignore
import LikeOutlined from '~icons/ant-design/like-outlined'
// @ts-ignore
import LikeFilled from '~icons/ant-design/like-filled'
// @ts-ignore
import Comment from '~icons/fluent/comment-16-regular'
// @ts-ignore
import ForwardOutline from '~icons/typcn/arrow-forward-outline'

const topics = ref([] as TopicData['data'])
const comments = ref([] as CommentData['data'])
const commentDrawer = ref(false)

getTopic(1, 10).then(res => {
  topics.value = res.data.data.data
})

function extractImages(content: string) {
  if (content.startsWith('__IMG[') && content.indexOf(']IMG__') > 6) {
    const images = JSON.parse(content.substring(5, content.indexOf(']IMG__') + 1)) as string[]
    if (Array.isArray(images) && typeof images[0] === 'string') return { content: content.substring(content.indexOf(']IMG__') + 6), images }
  }
  return { content }
}

function likeClick(topic: TopicData['data'][0]) {
  const get = async () => {
    return topic.like ? await unlike(topic.topicId) : await like(topic.topicId)
  }
  get().then(res => {
    if (res.data.code === 0) {
      topic.like = !topic.like
      if (topic.like) topic.likeCount++
      else topic.likeCount--
    }
  })
}

function commentClick(topic: TopicData['data'][0]) {
  commentDrawer.value = true
  getComment(topic.topicId, 1, 10).then(res => {
    comments.value = res.data.data.data
  })
}
</script>

<template>
  <NLayoutContent
    position="absolute"
    style="top: 46px;bottom: 60px;word-break: break-all;"
    :native-scrollbar="false"
  >
    <div v-for="topic in topics" :key="topic.topicId" class="px-2 mt-2">
      <div class="flex justify-between">
        <div class="flex">
          <NAvatar :src="topic.author.avatar"></NAvatar>
          <div>{{ topic.author.name }}</div>
        </div>
        <NButton size="small" type="primary" ghost>关注</NButton>
      </div>
      <div class="text-lg">{{ topic.title }}</div>
      <div>{{ extractImages(topic.content).content }}</div>
      <div>
        <NImage
          v-for="img in extractImages(topic.content).images"
          :key="img"
          object-fit="contain"
          style="width: 30vw;"
          :src="baseFileURL + img"
        />
      </div>
      <div class="flex justify-end">
        <NButton size="large" :bordered="false" @click="likeClick(topic)">
          <template #icon>
            <LikeFilled v-if="topic.like" class="text-pink-500" />
            <LikeOutlined v-else />
          </template>
          {{ topic.likeCount }}
        </NButton>
        <NButton size="large" :bordered="false" @click="commentClick(topic)">
          <template #icon>
            <Comment />
          </template>
          {{ topic.commentCount }}
        </NButton>
        <NButton size="large" :bordered="false">
          <ForwardOutline />
        </NButton>
      </div>
    </div>
  </NLayoutContent>
  <NDrawer v-model:show="commentDrawer" placement="bottom" height="60vh">
    <div v-for="comment in comments" :key="comment.commentId" class="mt-1 mx-2">
      <div>{{ comment.author.name }}：{{ comment.content }}</div>
    </div>
  </NDrawer>
</template>
