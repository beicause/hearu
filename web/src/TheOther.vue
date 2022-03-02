<script setup lang="ts">
import { useDialog, useMessage } from 'naive-ui'
import { checkAppUpdateDialog } from './common/android'

const m = useMessage()
const d = useDialog()

checkAppUpdateDialog(false, m, d)
</script>

<template>
  <div></div>
</template>
