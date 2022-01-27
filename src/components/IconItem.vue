<template>
  <IconButton class="icon-btn">
    <template #icon>
      <div class="icon-container" v-bind="$attrs">
        <slot name="icon"></slot>
      </div>
    </template>
    <slot></slot>
  </IconButton>
</template>
<script lang="ts">import { defineComponent } from "vue"
import IconButton from "./IconButton.vue"

export default defineComponent({
  components: { IconButton },
  inheritAttrs: false
})
</script>
<style scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.icon {
  width: 24px;
  height: 24px;
}
.icon-btn {
  width: 72px;
  height: 72px;
}
</style>

