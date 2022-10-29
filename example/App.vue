<script setup>
import Example1 from './example1.vue'
import ExampleBtn from './example-btn.vue'
import Menu from './menu.vue'
import { useFps } from '@vueuse/core'

const fps = useFps()
</script>

<template>
  <div class="row">
    <!-- Menu -->
    <Menu />

    <div class="space-y aic flex1">
      <h1 v-reveal-effect.light>Reveal Effects - Fluent Design</h1>

      <span v-reveal-effect.light style="font-size: 2em">FPS {{ fps }}</span>
      <br />

      <ExampleBtn />

      <br />

      <Example1 />
    </div>
  </div>
</template>
