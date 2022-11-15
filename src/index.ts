import { Directive, unref } from 'vue'
import { name, RevealEffectProps } from './interface'
import { UseRevealEffect, useRevealEffect, setDefaultProps } from './useRevealEffect'
export * from './useRevealEffect'

const map = new WeakMap<HTMLElement, UseRevealEffect>()

const RevealEffectDirective: Directive<HTMLElement, RevealEffectProps> = {
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

const RevealEffect = {
  name,
  setDefaultProps,
  install(app) {
    app.directive(name, RevealEffectDirective)
  }
}

export default RevealEffect
