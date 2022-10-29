<script setup>
const modules = import.meta.glob('./assets/*')

const imgs = Object.keys(modules).map(e => ({
  name: e.replace(/(.*\/)*([^.]+).*/, '$2').replace('Microsoft-', ''),
  url: new URL(e, import.meta.url).href
}))

const opt = {
  borderWidth: 2,
  borderGradientSize: 60
}
</script>

<template>
  <div class="container fwrap" style="width: 420px">
    <div v-reveal-effect.light="opt" v-for="(item, index) in imgs" :key="index" class="img flexc">
      <img :src="item.url" />
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.container > * {
  margin: 2px 2px;
}

.img {
  position: relative;
  width: 100px;
  height: 100px;
  background: #353535;
  box-sizing: border-box;
  user-select: none;
}

.img:hover::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.img > img {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
}
.img > .name {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 6px;
  font-size: 9px;
}
</style>
