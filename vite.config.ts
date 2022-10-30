import { defineConfig } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      'vue-reveal-effect': path.resolve(__dirname, './src/index')
    }
  },
  build: {
    outDir: 'docs'
  }
})
