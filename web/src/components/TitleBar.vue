<script setup lang="ts">
import IconArrow from './IconArrow.vue'

defineEmits(['back'])
const props = defineProps<{ name: string }>()
</script>

<template>
  <div class="flex items-center my-3">
    <IconArrow type="left" button @click="$emit('back')"></IconArrow>
    <span class="text-xl">{{ props.name }}</span>
    <slot></slot>
  </div>
</template>
