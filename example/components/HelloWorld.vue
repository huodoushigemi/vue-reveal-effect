<script setup>
import { ref } from 'vue'
import { useFps } from '@vueuse/core'

defineProps({
  msg: String
})

const fps = useFps()

const count = ref(0)
</script>

<template>
  <h1 v-reveal-effect>{{ msg }}</h1>

  <span v-reveal-effect style="font-size: 2em">{{ fps }} FPS</span>

  <p>
    Check out
    <a v-reveal-effect="{ borderWidth: 2 }" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
    , the official Vue + Vite starter
  </p>
  <p>
    Install
    <a v-reveal-effect href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p v-reveal-effect class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
