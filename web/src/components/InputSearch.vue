<script setup lang="ts">
import { InputInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

const isSearch = ref(false)
const inputSearch = ref<InputInst | null>(null)
</script>
<template>
  <NInputGroup>
    <NInput
      ref="inputSearch"
      v-bind="$attrs"
      clearable
      @keyup.enter="inputSearch && inputSearch.blur()"
      @blur="isSearch = false"
      @focus="isSearch = true"
    >
      <slot></slot>
    </NInput>
    <NButton v-show="isSearch">取消</NButton>
  </NInputGroup>
</template>

<script lang="ts">
  export default defineComponent({
    inheritAttrs:false
  })
</script>
