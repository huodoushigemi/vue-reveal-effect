<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a v-reveal-effect="{ borderWidth: 2 }" style="display: inline-block;">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a v-reveal-effect="{ borderWidth: 2 }" style="display: inline-block;">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
</style>
