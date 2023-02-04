<template>
  <div class="menu">
    <div v-reveal-effect="{ borderGradientSize: 55, bgGradientSize: 200 }" v-for="index in 30" class="li">item {{ index }}</div>
  </div>
</template>

<style scoped>
.menu {
  width: 220px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.05);
  overflow-y: overlay;
}
.li {
  padding: 12px 32px;
}
</style>
