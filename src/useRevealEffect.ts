import { hasOwn, MaybeElement, unrefElement, until, useMouse, useMousePressed, useTransition } from '@vueuse/core'
import { computed, reactive, ref, triggerRef, unref, watch, watchPostEffect } from 'vue'
import { queuePostFlushCb } from '@vue/runtime-core'
import { remove } from '@vue/shared'
import { TinyColor } from '@ctrl/tinycolor'

import { darkProps, defProps, lightProps, MaybeGetterRef, prefixCls, RevealEffectProps, UnMaybeGetterRef } from './interface'
import './style.css'

// 边缘检测
function knock(px: number, py: number, rect: DOMRect, threshold = 0) {
  const x = px - rect.x
  const y = py - rect.y
  return x >= -threshold && x <= rect.width + threshold && y >= -threshold && y <= rect.height + threshold
}

// 鼠标位置
const { x: px, y: py } = useMouse({ initialValue: { x: null, y: null }, type: 'client' })

const list = reactive<UseRevealEffect[]>([])

watchPostEffect(() => {
  list.forEach(e => {
    e.update()
  })
})

// =====================================================================================

let defaultProps = reactive<RevealEffectProps>({})

export function setDefaultProps(props: RevealEffectProps) {
  defaultProps = reactive(props)
}

// =====================================================================================

export type UseRevealEffect = ReturnType<typeof useRevealEffect>

export function useRevealEffect(elRef: MaybeElement, props?: RevealEffectProps) {
  const ins = { el: elRef, update, mount, unmount }
  const defDuration = 1000

  const el = unrefElement(elRef) as HTMLElement

  const resolveUnref = <T>(e: MaybeGetterRef<T>): T => (typeof e === 'function' ? (e as any)(el) : unref(e))
  const resolveFind = <K extends keyof RevealEffectProps>(arr: Array<RevealEffectProps>, k: K): UnMaybeGetterRef<RevealEffectProps[K]> => {
    let ret
    for (let i = 0; i < arr.length; i++) {
      if ((ret = resolveUnref(arr[i]?.[k])) != null) return ret
    }
  }
  const resolveObj = <T>(obj: T): { [K in keyof T]: UnMaybeGetterRef<T[K]> } => {
    const ret = {} as any
    for (const key in obj) {
      ret[key] = resolveUnref(obj[key])
    }
    return ret
  }

  const { pressed } = useMousePressed({ target: el })

  watch(pressed, async val => {
    // 按下
    if (val) {
      if (handing.value) await reset()
      source.value = 1
    } else {
      if (handing.value) {
        duration.value = 300
        triggerRef(source)
      } else {
        await reset()
      }
    }
  })

  // 点击效果 动画
  const source = ref(0)
  const duration = ref(defDuration)
  const handing = ref(false)
  const disabled = ref(false)
  const animation = useTransition(source, {
    duration,
    disabled,
    transition: [0, 0, 0.5, 0],
    onStarted: async () => {
      // console.log('onStarted')
      handing.value = true
    },
    onFinished: async () => {
      // console.log('onFinished')
      handing.value = false
      if (!pressed.value) await reset()
    }
  })
  const gradient1 = [0, 25, 75]
  const gradient2 = [0, 75, 125]
  const gradient = computed(() => gradient2.map((e, i) => gradient1[i] + (e - gradient1[i]) * animation.value))

  function reset() {
    duration.value = 1
    source.value = 0
    disabled.value = false
    const complete = ref(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        duration.value = defDuration
        handing.value = false
        complete.value = true
      })
    })
    return until(complete).toBeTruthy()
  }

  let knockP = { x: null, y: null }
  let knockBorder = false
  let showRG = false

  function update($props?: RevealEffectProps) {
    const $px = px.value
    const $py = py.value
    if ($px == null || $py == null) return

    const rect = el.getBoundingClientRect()
    el.classList.add(prefixCls)

    if ($props) props = $props
    const light = resolveFind([props, defaultProps, defProps], 'light')
    const colorModeProps = light ? lightProps : darkProps
    let _props = resolveObj({
      ...defProps,
      ...defaultProps,
      ...props,
      borderColor: hasOwn(props, 'borderColor') ? resolveUnref(props.borderColor) : resolveFind([defaultProps, colorModeProps], 'borderColor'),
      bgColor: hasOwn(props, 'bgColor') ? resolveUnref(props.bgColor) : resolveFind([defaultProps, colorModeProps], 'bgColor')
    })

    // border
    if (_props.borderWidth && knock($px, $py, rect, _props.borderGradientSize)) {
      const x = $px - rect.x
      const y = $py - rect.y

      queuePostFlushCb(() => el.style.setProperty(`--xBorderImage`, `radial-gradient(${_props.borderGradientSize}px at ${x}px ${y}px, ${_props.borderColor}, transparent) 1`))
      queuePostFlushCb(() => el.style.setProperty(`--xBorderWidth`, `${_props.borderWidth}px`))
      knockBorder = true
    } else if (knockBorder) {
      queuePostFlushCb(() => removeBorder())
      knockBorder = false
    }

    // background
    const knockBlock = knock($px, $py, rect)

    if ((knockBlock || handing.value) && _props.bgColor) {
      const x = knockP.x - rect.x
      const y = knockP.y - rect.y

      if (knockBlock) {
        knockP = { x: $px, y: $py }
        queuePostFlushCb(() => el.style.setProperty(`--xRadialGradient`, `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, ${_props.bgColor}, transparent 100%)`))
      } else {
        queuePostFlushCb(() => el.style.removeProperty(`--xRadialGradient`))
      }

      // splash
      if (handing.value && _props.clickEffect) {
        const low = 0.1
        const high = 1
        const tcolor = new TinyColor(_props.bgColor)
        const color = tcolor.setAlpha(tcolor.getAlpha() * (low + (high - low) * (1 - animation.value))).toHex8String()
        const splash = `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, transparent ${gradient.value[0]}%, ${color} ${gradient.value[1]}%, transparent ${gradient.value[2]}%)`
        queuePostFlushCb(() => el.style.setProperty(`--xSplash`, splash))
      } else {
        queuePostFlushCb(() => el.style.removeProperty(`--xSplash`))
      }

      showRG = true
    } else if (showRG) {
      queuePostFlushCb(() => removeBg())
      showRG = false
    }
  }

  function removeBg() {
    ;['xRadialGradient', 'xSplash'].forEach(e => {
      el.style.removeProperty(`--${e}`)
    })
  }
  function removeBorder() {
    ;['xBorderImage', 'xBorderWidth'].forEach(e => {
      el.style.removeProperty(`--${e}`)
    })
  }

  function mount() {
    list.includes(ins) || list.push(ins)
  }
  function unmount() {
    removeBg()
    removeBorder()
    remove(list, ins)
    el.classList.remove(prefixCls)
  }

  mount()

  return ins
}
