import { MaybeRef, usePreferredDark } from '@vueuse/core'
import { Ref } from 'vue'

export const name = 'reveal-effect'
export const prefixCls = `x-${name}`

export const lightProps = {
  borderColor: 'rgba(200, 200, 200, .4)',
  bg: 'rgba(200, 200, 200, .2)'
}

export const darkProps = {
  borderColor: 'rgba(100, 100, 100, .4)',
  bg: 'rgba(100, 100, 100, .2)'
}

type DeepUnref<T> = T extends Ref<infer V> ? DeepUnref<V> : T

export const defProps = {
  ...darkProps,
  borderWidth: 1,
  borderGradientSize: 100,
  bgGradientSize: 130,
  light: usePreferredDark(),
  clickEffect: true,
  disabled: false
}

export type MaybeGetterRef<T> = ((el: HTMLElement) => T) | Ref<T> | T

export type RevealEffectProps = {
  [k in keyof typeof defProps]?: MaybeGetterRef<DeepUnref<typeof defProps[k]>>
}

export type RevealEffectProps2 = typeof defProps
