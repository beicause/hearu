import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import component from 'unplugin-vue-components/vite'
import resolvers from 'unplugin-vue-components/resolvers'
import windicss from 'vite-plugin-windicss'
import icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    windicss(),
    icons(),
    component({ dts: false, resolvers: [resolvers.NaiveUiResolver()] })
  ]
})
