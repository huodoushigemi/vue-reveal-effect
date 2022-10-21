<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <span v-border-light="{ color: 'red' }" style="display: inline-block">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </span>
    <span v-border-light="{ borderWidth: 2 }" style="display: inline-block">
      <img src="./assets/vue.svg" class="logo" alt="Vue logo" />
    </span>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
/* .logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
