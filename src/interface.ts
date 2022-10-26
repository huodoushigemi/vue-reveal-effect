import { DirectiveBinding } from 'vue'

export const name = 'reveal-effect'
export const prefixCls = `x-${name}`

export type RevealEffectProps = Partial<{
  borderWidth: number
  borderColor: string
  borderGradientSize: number
  bg: string
  bgGradientSize: number
  light: boolean
  disabled: boolean
}>

export interface State {
  el: HTMLElement
  binding: DirectiveBinding<RevealEffectProps>
}
