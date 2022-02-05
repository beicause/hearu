<template>
  <NButton :bordered="false" class="icon-btn">
    <IconDiv>
      <template #icon>
        <div class="icon-container" v-bind="$attrs">
          <slot name="icon"></slot>
        </div>
      </template>
      <span class="pt-1">
        <slot></slot>
      </span>
    </IconDiv>
  </NButton>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import IconDiv from "./IconVertDiv.vue"

export default defineComponent({
  components: { IconDiv },
  inheritAttrs: false
})
</script>
<style scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.icon-btn {
  width: 72px;
  height: 72px;
}
</style>

