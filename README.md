<h2>Vue Reveal Effect</h2>

[![fork](https://img.shields.io/github/forks/huodoushigemi/vue-reveal-effect.svg?style=flat-square)](https://github.com/huodoushigemi/vue-reveal-effect)
[![stars](https://img.shields.io/github/stars/huodoushigemi/vue-reveal-effect.svg?style=flat-square)](https://github.com/huodoushigemi/vue-reveal-effect)
![npm](https://img.shields.io/npm/dw/vue-reveal-effect?style=flat-square)

![vue-reveal-effect](https://raw.githubusercontent.com/huodoushigemi/vue-reveal-effect/main/example/doc/screenshot.png)

## 🌈 Demo

- https://huodoushigemi.github.io/vue-reveal-effect/

## 🚀 Requirements

- Chorme 76+
- Vue 3+

## ⚙️ Installation

```coffeescript
npm i -S vue-reveal-effect
```

## 🦄 Use in JS

```html
<h1 id="reveal1">REVEAL EFFECT</h1>
<h1 id="reveal2">REVEAL EFFECT</h1>
<h1 id="reveal3">REVEAL EFFECT</h1>

<script>
  import { useRevealEffect } from 'vue-reveal-effect';

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

  useRevealEffect(document.getElementById('reveal1'));
  useRevealEffect(document.getElementById('reveal2'), options2);
  useRevealEffect(document.getElementById('reveal3'), options3);
</script>
```

## 🦄 Use in Vue

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

## 📄 Props

| Name               | Type                | Default | Description                |
| ------------------ | ------------------- | ------- | -------------------------- |
| borderWidth        | `MaybeRef<number>`  | 1       |                            |
| borderColor        | `MaybeRef<string>`  |         |                            |
| borderGradientSize | `MaybeRef<number>`  | 100     |                            |
| bgColor            | `MaybeRef<string>`  |         |                            |
| bgGradientSize     | `MaybeRef<number>`  | 130     |                            |
| clickEffect        | `MaybeRef<boolean>` | true    | Enable ripple click effect |
| light              | `MaybeRef<boolean>` |         |                            |
| disabled           | `MaybeRef<boolean>` | false   |                            |

## ☹ Not Supported

- ❌ `border-radius` attribute of css is not supported
- ❌ `<img />` tag of html is not supported

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.

[![fork](https://img.shields.io/github/forks/huodoushigemi/vue-reveal-effect.svg?style=flat-square)](https://github.com/huodoushigemi/vue-reveal-effect)
[![fork](https://img.shields.io/github/stars/huodoushigemi/vue-reveal-effect.svg?style=flat-square)](https://github.com/huodoushigemi/vue-reveal-effect)
