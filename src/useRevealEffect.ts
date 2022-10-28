import { hasOwn, MaybeElementRef, unrefElement, until, useMouse, useMousePressed, useTransition } from '@vueuse/core'
import { computed, reactive, ref, triggerRef, unref, watch, watchEffect } from 'vue'
import { remove } from '@vue/shared'
import { TinyColor } from '@ctrl/tinycolor'

import { darkProps, defProps, lightProps, prefixCls, RevealEffectProps, RevealEffectProps2 } from './interface'
import './style.scss'

// 边缘检测
function knock(p: [number, number], rect: DOMRect, threshold = 0) {
  const x = p[0] - rect.x
  const y = p[1] - rect.y
  return x >= -threshold && x <= rect.width + threshold && y >= -threshold && y <= rect.height + threshold
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

export function useRevealEffect(elRef: MaybeElementRef, props?: RevealEffectProps) {
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
  const gradient1 = [0, 25, 75]
  const gradient2 = [0, 75, 125]
  const gradient = computed(() => gradient2.map((e, i) => gradient1[i] + (e - gradient1[i]) * animation.value))
  const showSplash = computed(() => handing.value || pressed.value)

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

  function update($props?: RevealEffectProps) {
    if ($props) props = $props
    let _props = Object.keys(props ?? {}).reduce((o, e) => ((o[e] = unref(props[e])), o), {}) as RevealEffectProps2
    _props = {
      ...defProps,
      ..._props,
      borderColor: hasOwn(_props, 'borderColor') ? _props.borderColor : _props.light ? lightProps.borderColor : darkProps.borderColor,
      bg: hasOwn(_props, 'bg') ? _props.bg : _props.light ? lightProps.bg : darkProps.bg
    }

    // border
    removeBorder()
    const rect = el.getBoundingClientRect()
    if (_props.borderWidth && knock([px.value, py.value], rect, _props.borderGradientSize)) {
      el.classList.add(prefixCls)
      const x = px.value - rect.x
      const y = py.value - rect.y
      const vars = {
        xBorderImage: `radial-gradient(${_props.borderGradientSize}px at ${x}px ${y}px, ${_props.borderColor}, transparent) 1`,
        xBorderWidth: _props.borderWidth + 'px'
      }
      for (const key in vars) {
        el.style.setProperty(`--${key}`, vars[key])
      }
    }

    // background
    removeBg()
    if (_props.bg && knock([px.value, py.value], rect)) {
      console.log(11)

      const x = px.value - rect.x
      const y = py.value - rect.y
      const tcolor = new TinyColor(_props.bg)
      const low = 0.1
      const high = 1.2
      const bg = tcolor
        .clone()
        .setAlpha(tcolor.getAlpha() * 0.1)
        .toHex8String()
      const bg2 = tcolor
        .clone()
        .setAlpha(tcolor.getAlpha() * (low + (high - low) * (1 - animation.value)))
        .toHex8String()

      const rg = `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, ${_props.bg}, transparent 100%)`
      const vars = {
        xBg: bg,
        xRadialGradient: rg,
        xSplash: 'none'
      }
      if (_props.clickEffect && showSplash.value) {
        vars.xSplash = `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, transparent ${gradient.value[0]}%, ${bg2} ${gradient.value[1]}%, transparent ${gradient.value[2]}%)`
      }
      for (const key in vars) {
        el.style.setProperty(`--${key}`, vars[key])
      }
    }
  }

  function removeBg() {
    ;['xBg', 'xRadialGradient', 'xSplash'].forEach(e => {
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
