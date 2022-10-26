import { Directive, Plugin } from 'vue'
import { name, RevealEffectProps } from './interface'
import { UseRevealEffect, useRevealEffect } from './useRevealEffect'

const map = new WeakMap<HTMLElement, UseRevealEffect>()

let has = false

const RevealEffect: Directive<HTMLElement, RevealEffectProps> & Plugin & { name: string } = {
  name,
  install(app) {
    app.directive(name, RevealEffect)
  },
  mounted(el, binding) {
    // if (has) return
    // has = true
    const reveal = useRevealEffect(el, binding.value)
    map.set(el, reveal)
  },
  updated(el, binding) {
    map.get(el)?.update(binding.value)
  },
  unmounted(el) {
    map.get(el)?.unmount()
    map.delete(el)
  }
}

export default RevealEffect
