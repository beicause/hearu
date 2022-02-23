<script setup lang="ts">
import { SelectOption } from 'naive-ui'
import { ref } from 'vue'

const options: SelectOption[] = [
  { label: '关注', value: 'interest' },
  { label: '附近', value: 'near' },
  { label: '话题', value: 'topic' }
]
const selected = ref('')
selected.value = options[0].value as string
</script>

<template>
  <NSelect v-model:value="selected" class="px-2 mt-1" :options="options"></NSelect>
</template>
