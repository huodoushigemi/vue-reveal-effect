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
      <h1 v-reveal-effect>Reveal Effects - Fluent Design</h1>

      <span v-reveal-effect style="font-size: 2em">FPS {{ fps }}</span>
      <br />

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
</style>
