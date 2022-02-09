<script setup  lang="ts">
import { h } from 'vue'
// @ts-ignore
import ArrowLeft from '~icons/fe/arrow-left'
// @ts-ignore
import ArrowRight from '~icons/fe/arrow-right'

interface Props {
  type: 'left' | 'right', button?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  button: false
})

const arrow = (type: 'left' | 'right') => h(type === 'left' ? ArrowLeft : ArrowRight, { key: type, class: 'text-xl' })

</script>

<template>
  <NButton v-if="props.button" :bordered="false">
    <component :is="arrow(props.type)"></component>
  </NButton>
  <component :is="arrow(props.type)" v-else></component>
</template>
