import { useColorMode, useCycleList, usePreferredColorScheme, usePreferredDark } from '@vueuse/core'
import { computed } from 'vue'

export const colorMode = useColorMode({ emitAuto: true })

const preferredDark = usePreferredDark()

export const isDark = computed(() => {
  if (colorMode.value == 'auto') {
    return preferredDark.value
  }
  return colorMode.value == 'dark'
})

export const { next } = useCycleList(['dark', 'light', 'auto'], { initialValue: colorMode })
