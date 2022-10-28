import { MaybeRef } from '@vueuse/core'
import { DirectiveBinding } from 'vue'

export const name = 'reveal-effect'
export const prefixCls = `x-${name}`

export const lightProps = {
  borderColor: 'rgba(255, 255, 255, .4)',
  bg: 'rgba(255, 255, 255, .14)'
}

export const darkProps = {
  borderColor: 'rgba(100, 100, 100, .4)',
  bg: 'rgba(0, 0, 0, .1)'
}

export const defProps = {
  ...darkProps,
  borderWidth: 1,
  borderGradientSize: 100,
  bgGradientSize: 130,
  light: null as boolean,
  clickEffect: true,
  disabled: false
}

export type RevealEffectProps = {
  [k in keyof typeof defProps]?: MaybeRef<typeof defProps[k]>
}

export type RevealEffectProps2 = typeof defProps

export interface State {
  el: HTMLElement
  binding: DirectiveBinding<RevealEffectProps>
}
