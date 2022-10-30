### 描边效果
![vue-reveal-effect](https://raw.githubusercontent.com/huodoushigemi/vue-reveal-effect/main/example/doc/screensgot.png)

### Demo

- [asd](http://www.baidu.com)

### **Requirements**

- Chorme 76+
- Vue 3+

### **Install**

```coffeescript
npm i -S vue-reveal-effect
```

### **Use in JS**

```html
<h1 id="reveal1">REVEAL EFFECT</h1>
<h1 id="reveal2">REVEAL EFFECT</h1>
<h1 id="reveal3">REVEAL EFFECT</h1>

<script>
  import { useRevealEffect } from "vue-reveal-effect";

  const options2 = {
    borderWidth: 4,
    borderColor: 'rgba(255, 0, 0, 40%)',
    borderSize: 40,
    bgSize: 40
    bgColor: '#00a1ff'
  }

  const options3 = {
    borderWidth: 2,
    clickEffect: false
  }

  useRevealEffect(document.getElementById("reveal1"));
  useRevealEffect(document.getElementById("reveal2"), options2);
  useRevealEffect(document.getElementById("reveal3"), options3);
</script>
```

### **Use in Vue**

```js
import { createApp } from 'vue'
import VueRevealEffect from 'vue-reveal-effect'

createApp(App).use(VueRevealEffect).mount('#app')
```

```html
<template>
  <h1 v-reveal-effect>VUE REVEAL EFFECT</h1>
  <h1 v-reveal-effect="options1">VUE REVEAL EFFECT</h1>
  <h1 v-reveal-effect="options2">VUE REVEAL EFFECT</h1>
</template>

<script setup>
  const options1 = {
    borderWidth: 4,
    borderColor: 'rgba(255, 0, 0, 40%)',
    borderSize: 40,
    bgSize: 40
    bgColor: '#00a1ff'
  }

  const options2 = {
    borderWidth: 2,
    clickEffect: false
  }
</script>
```

### **Props**

| name           | Type                | Default | Description                |
| -------------- | ------------------- | ------- | -------------------------- |
| borderWidth    | `MaybeRef<number>`  | 1       |                            |
| borderColor    | `MaybeRef<string>`  |         |                            |
| borderSize     | `MaybeRef<number>`  | 130     |                            |
| bgColor        | `MaybeRef<string>`  |         |                            |
| bgGradientSize | `MaybeRef<number>`  | 100     |                            |
| clickEffect    | `MaybeRef<boolean>` | true    | Enable ripple click effect |
| disabled       | `MaybeRef<boolean>` | false   |                            |


#### Not Supported
- `border-radius` attribute of css is not supported
- `<img />` tag of html is not supported