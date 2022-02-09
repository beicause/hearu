import { computed, ref, watchEffect } from "vue"
import { darkTheme, lightTheme } from "naive-ui"
import { Android } from "./android"

export const theme = ref(localStorage.getItem('theme')||Android?.getTheme() || 'light' as 'light' | 'dark')
export const themeObject = computed(() => theme.value === 'dark' ? darkTheme : lightTheme)
watchEffect(() => {
  localStorage.setItem('theme', theme.value)
})
