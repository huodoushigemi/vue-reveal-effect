import { computed, createApp, watchEffect } from 'vue'
import './style.css'
import App from './App.vue'
import { isDark } from './dark'
import RevealEffect from 'vue-reveal-effect'

RevealEffect.setDefaultProps({
  light: isDark
})

createApp(App).use(RevealEffect).mount('#app')
