import { computedEager, MaybeElementRef, TransitionPresets, unrefElement, until, useEventListener, useMouse, useMousePressed, useRafFn, useTransition } from '@vueuse/core'
import { computed, nextTick, reactive, ref, toRaw, triggerRef, watch, watchEffect } from 'vue'
import { remove } from '@vue/shared'
import { TinyColor } from '@ctrl/tinycolor'

import { prefixCls, RevealEffectProps } from './interface'
import './style.scss'

// 边缘检测
function knock(p: [number, number], rect: DOMRect, threshold = 0) {
  const x = p[0] - rect.x
  const y = p[1] - rect.y
  return x > -threshold && x < rect.width + threshold && y > -threshold && y < rect.height + threshold
}

// 鼠标状态
const { x: px, y: py } = useMouse()

const list = reactive<UseRevealEffect[]>([])

watchEffect(() => {
  list.forEach(e => {
    e.update()
  })
})

export type UseRevealEffect = ReturnType<typeof useRevealEffect>

const source1 = 0
const source2 = 1

export function useRevealEffect(elRef: MaybeElementRef, defProps?: RevealEffectProps) {
  const ins = { el: elRef, update, mount, unmount }
  const defDuration = 1000
  mount()

  const el = unrefElement(elRef)
  const { pressed } = useMousePressed({ target: el })

  watch(pressed, async val => {
    // 按下
    if (val) {
      if (handing.value) await reset()
      source.value = source2
    } else {
      if (handing.value) {
        duration.value = 300
        triggerRef(source)
      } else {
        await reset()
      }
      // await reset()
    }
  })

  // 点击效果 动画
  const source = ref(source1)
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
  const gradient1 = [0, 30, 150]
  const gradient2 = [0, 100, 150]
  const gradient = computed(() => gradient2.map((e, i) => gradient1[i] + (e - gradient1[i]) * animation.value))

  function reset() {
    duration.value = 1
    source.value = source1
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

  let _props = defProps ?? {}

  function update(props?: RevealEffectProps) {
    _props = props ??= _props
    props = {
      borderColor: props.light ? 'rgba(255, 255, 255, .4)' : 'rgba(100, 100, 100, .4)',
      borderWidth: 1,
      borderGradientSize: 100,
      bg: props.light ? 'rgba(255, 255, 255, .14)' : 'rgba(150, 150, 150, .34)',
      bgGradientSize: 130,
      ...props
    }

    // border
    const rect = el.getBoundingClientRect()
    if (props.borderWidth && knock([px.value, py.value], rect, props.borderGradientSize)) {
      el.classList.add(prefixCls)
      const x = px.value - rect.x
      const y = py.value - rect.y
      const vars = {
        xBorderImage: `radial-gradient(${props.borderGradientSize}px at ${x}px ${y}px, ${props.borderColor}, transparent) 1`,
        xBorderWidth: props.borderWidth + 'px'
      }
      for (const key in vars) {
        el.style.setProperty(`--${key}`, vars[key])
      }
    } else {
      removeBorder()
    }

    // background
    if (props.bg && knock([px.value, py.value], rect)) {
      const x = px.value - rect.x
      const y = py.value - rect.y
      const tcolor = new TinyColor(props.bg)
      const low = 0.1
      const high = 0.75
      const bg = tcolor
        .clone()
        .setAlpha(tcolor.getAlpha() * 0.1)
        .toHex8String()
      const bg2 = tcolor
        .clone()
        .setAlpha(tcolor.getAlpha() * (low + (high - low) * (1 - animation.value)))
        .toHex8String()

      const rg = `radial-gradient(${props.bgGradientSize}px at ${x}px ${y}px, ${props.bg}, transparent 100%)`
      const rg2 = `radial-gradient(${props.bgGradientSize}px at ${x}px ${y}px, transparent ${gradient.value[0]}%, ${bg2} ${gradient.value[1]}%, transparent ${gradient.value[2]}%)`
      const vars = {
        xBg: bg,
        xRadialGradient: rg,
        xRadialGradient2: handing.value || pressed.value ? rg2 : 'none'
      }
      for (const key in vars) {
        el.style.setProperty(`--${key}`, vars[key])
      }
    } else {
      removeBg()
    }
  }

  function removeBg() {
    ;['xBg', 'xRadialGradient', 'xRadialGradient2'].forEach(e => {
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

  return ins
}
