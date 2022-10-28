import { Directive, Plugin, unref } from 'vue'
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
    const reveal = useRevealEffect(el, {
      ...binding.value,
      light: unref(binding.value?.light) ?? binding.modifiers.light
    })
    map.set(el, reveal)
  },
  updated(el, binding) {
    map.get(el)?.update({
      ...binding.value,
      light: unref(binding.value?.light) ?? binding.modifiers.light
    })
  },
  unmounted(el) {
    map.get(el)?.unmount()
    map.delete(el)
  }
}

export default RevealEffect
