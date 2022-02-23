<script setup lang="ts">
import { computed, ref } from 'vue'
import { comment as publishComment, CommentData, getComment, getTopic, like, TopicData, unlike } from '../../common/api_topic'
import { baseFileURL } from '../../common/api_upload'
// @ts-ignore
import LikeOutlined from '~icons/ant-design/like-outlined'
// @ts-ignore
import LikeFilled from '~icons/ant-design/like-filled'
// @ts-ignore
import Comment from '~icons/fluent/comment-16-regular'
// @ts-ignore
import ForwardOutline from '~icons/typcn/arrow-forward-outline'
import { InputInst, useMessage } from 'naive-ui'
import { theme } from '../../common/state'

const topics = ref([] as TopicData['data'])
const currentCommentTopic = ref(null as TopicData['data'][0] | null)
const currentCommentComment = ref(null as CommentData['data'][0] | null)
const comments = ref([] as CommentData['data'])
const commentDrawer = ref(false)
const inputReply = ref<InputInst | null>(null)
const commentContent = ref('')
const message = useMessage()

function initTopics() {
  getTopic(1, 10).then(res => {
    res.data.code !== 0 && message.error(res.data.msg)
    topics.value = res.data.data.data
  }).catch(err => {
    message.error(err)
  })
}
initTopics()

function extractSrc(content: string) {
  if (content.startsWith('__SRC[') && content.indexOf(']SRC__') >= 6) {
    const sources = JSON.parse(content.substring(5, content.indexOf(']SRC__') + 1)) as { url: string, type: string }[]
    if (Array.isArray(sources) && (sources.length === 0 || typeof sources[0] === 'object')) return { content: content.substring(content.indexOf(']SRC__') + 6), sources }
  }
  return { content, sources: [] }
}

function extractTime(time: string) {
  const date = new Date()
  if (time.startsWith('' + date.getFullYear())) return time.substring(5)
  else return time
}

function likeTopicClick(topic: TopicData['data'][0]) {
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

function commentTopicClick(topic: TopicData['data'][0]) {
  commentDrawer.value = true
  currentCommentTopic.value = topic
  getComment(topic.topicId, 1, 10).then(res => {
    comments.value = res.data.data.data
  })
}

function likeCommentClick(comment: CommentData['data'][0]) {
  const get = async () => {
    return comment.like ? await unlike(comment.commentId, 'comment') : await like(comment.commentId, 'comment')
  }
  get().then(res => {
    if (res.data.code === 0) {
      comment.like = !comment.like
      if (comment.like) comment.likeCount++
      else comment.likeCount--
    }
  })
}

function commentCommentClick(comment: CommentData['data'][0]) {
  currentCommentComment.value = comment
  inputReply.value?.focus()
}

function commentClick() {
  const type = currentCommentComment.value ? 'comment' : currentCommentTopic.value ? 'topic' : null
  if (type && commentContent.value) publishComment(type === 'comment' ? currentCommentComment.value!.commentId : currentCommentTopic.value!.topicId, commentContent.value, type).then(res => {
    if (res.data.code === 0) {
      inputReply.value?.blur()
      commentTopicClick(currentCommentTopic.value!)
      initTopics()
      message.success('成功')
    }
    else message.error(res.data.msg)
  }).catch(err => {
    message.error(err)
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
      <div class="flex justify-between items-center">
        <div class="flex">
          <NAvatar :size="50" :src="topic.author.avatar"></NAvatar>
          <div class="ml-1">
            <div class="text-lg font-bold">{{ topic.author.name }}</div>
            <div>{{ topic.author.signature }}</div>
          </div>
        </div>
        <NButton size="small" type="primary" ghost>关注</NButton>
      </div>
      <div class="text-lg">{{ topic.title }}</div>
      <div>{{ extractSrc(topic.content).content }}</div>
      <div>
        <NImage
          v-for="src in extractSrc(topic.content).sources.filter(s => s.type.startsWith('image/'))"
          :key="src.url"
          object-fit="contain"
          style="width: 30vw;"
          :src="baseFileURL + src.url"
        />
        <video
          v-for="src in extractSrc(topic.content).sources.filter(s => s.type.startsWith('video/'))"
          :key="src.url"
          :src="baseFileURL + src.url"
          controls
        ></video>
      </div>
      <div class="flex justify-between items-center">
        <div>{{ topic.createTime }}</div>
        <div>
          <NButton size="large" :bordered="false" @click="likeTopicClick(topic)">
            <template #icon>
              <LikeFilled v-if="topic.like" class="text-pink-500" />
              <LikeOutlined v-else />
            </template>
            {{ topic.likeCount }}
          </NButton>
          <NButton size="large" :bordered="false" @click="commentTopicClick(topic)">
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
    </div>
  </NLayoutContent>
  <NDrawer v-model:show="commentDrawer" placement="bottom" height="60vh" :auto-focus="false">
    <div v-for="comment in comments" :key="comment.commentId" class="mt-1 mx-2">
      <div class="flex justify-between">
        <div class="font-bold">{{ comment.author.name }}</div>
        <div>{{ extractTime(comment.createTime) }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div>{{ comment.content }}</div>
        <div>
          <NButton :bordered="false" @click="likeCommentClick(comment)">
            <template #icon>
              <LikeFilled v-if="comment.like" class="text-pink-500" />
              <LikeOutlined v-else />
            </template>
            {{ comment.likeCount }}
          </NButton>
          <NButton :bordered="false" @click="commentCommentClick(comment)">
            <template #icon>
              <Comment />
            </template>
            {{ comment.commentCount }}
          </NButton>
        </div>
      </div>

      <div
        v-if="comment.comments.length > 0"
        class="p-2"
        :class="{ 'bg-gray-100': theme === 'light', 'bg-dark-800': theme === 'dark' }"
      >
        <div
          v-for="com in comment.comments"
          :key="com.commentId"
        >
          {{ com.author.name }}：{{ com.content }}
        </div>
      </div>
    </div>

    <NInputGroup class="absolute bottom-4 px-2">
      <NInput
        ref="inputReply"
        v-model:value="commentContent"
        :placeholder="'回复' + (currentCommentComment ? `${currentCommentComment.author.name}的评论` : currentCommentTopic ? `${currentCommentTopic.author.name}的话题` : '')"
        @keyup.enter="commentClick"
        @blur="currentCommentComment = null"
      ></NInput>
      <NButton :focusable="false" @click="commentClick">发布</NButton>
    </NInputGroup>
  </NDrawer>
</template>
