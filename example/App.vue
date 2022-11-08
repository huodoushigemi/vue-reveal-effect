<script setup>
import Example1 from './example1.vue'
import Menu from './menu.vue'
import { useFps } from '@vueuse/core'
import { next, colorMode } from './dark'

const fps = useFps()
</script>

<template>
  <div class="row">
    <!-- Menu -->
    <Menu />

    <div class="space-y aic flex1">
      <br /><br /><br /><br /><br /><br />

      <span v-reveal-effect style="font-size: 2em">FPS {{ fps }}</span>

      <div class="aic">
        <a v-reveal-effect href="https://github.com/huodoushigemi/vue-reveal-effect" target="_blank">
          <img src="https://img.shields.io/github/forks/huodoushigemi/vue-reveal-effect.svg?style=flat-square" />
        </a>
        &emsp;
        <a v-reveal-effect href="https://github.com/huodoushigemi/vue-reveal-effect" target="_blank">
          <img src="https://img.shields.io/github/stars/huodoushigemi/vue-reveal-effect.svg?style=flat-square" />
        </a>
      </div>

      <button v-reveal-effect @click="next()">color-mode: {{ colorMode }}</button>
      <br />

      <Example1 />
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: 1.4em;
  color: inherit;
}
a {
  line-height: 0;
}
</style>
