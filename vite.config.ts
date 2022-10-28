import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import packageJson from './package.json'
import VitePluginStyleInject from 'vite-plugin-style-inject'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      // https://cdn.jsdelivr.net/npm/vue@3.2.37/dist/vue.global.js
      // modules: [{ name: 'vue', var: 'Vue', path: 'https://cdn.jsdelivr.net/npm/vue@3.2.37/dist/vue.runtime.global.prod.js' }]
    })
  ],
  base: './',
  build: {
    outDir: 'exmaple_dist'
  }
})
