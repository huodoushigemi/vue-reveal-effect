import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginStyleInject from 'vite-plugin-style-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePluginStyleInject()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue-reveal-effect',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue']
    }
  }
})
