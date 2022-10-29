<script setup>
const opt1 = {
  borderWidth: 2,
  light: true
}

const opt2 = {
  borderWidth: 0,
  light: true
}

const opt3 = {
  borderWidth: 4,
  bg: null,
  light: true
}
</script>

<template>
  <div class="space-x jcc" style="">
    <button v-reveal-effect="opt1" class="btn">Button 1</button>
    <button v-reveal-effect="opt1" class="btn btn-primary">Button 2</button>
    <button v-reveal-effect="opt1" class="btn btn-danger">Button 3</button>
    <button v-reveal-effect="opt1" class="btn btn-success">Button 4</button>
    <button v-reveal-effect="opt1" class="btn btn-warning">Button 5</button>
  </div>

  <div class="space-x jcc" style="">
    <button v-reveal-effect="opt2" class="btn">Button 1</button>
    <button v-reveal-effect="opt2" class="btn btn-primary">Button 2</button>
    <button v-reveal-effect="opt2" class="btn btn-danger">Button 3</button>
    <button v-reveal-effect="opt2" class="btn btn-success">Button 4</button>
    <button v-reveal-effect="opt2" class="btn btn-warning">Button 5</button>
  </div>

  <div class="space-x jcc" style="">
    <button v-reveal-effect="opt3" class="btn">Button 1</button>
    <button v-reveal-effect="opt3" class="btn btn-primary">Button 2</button>
    <button v-reveal-effect="opt3" class="btn btn-danger">Button 3</button>
    <button v-reveal-effect="opt3" class="btn btn-success">Button 4</button>
    <button v-reveal-effect="opt3" class="btn btn-warning">Button 5</button>
  </div>
</template>

<style scoped>
.btn {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}
.btn-primary {
  background: #0078d7;
}
.btn-danger {
  background: #841130;
}
.btn-success {
  background: #18a058;
}
.btn-warning {
  background: #f0a020;
}
</style>
