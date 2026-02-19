import { useEventListener, useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import { MOBILE_BREAKPOINT } from '@/constants/mobile'

export const useOverlay = (listen = true) => {
  const x = ref(0)
  const y = ref(0)
  const { width } = useWindowSize()
  const isMobile = computed(() => width.value <= MOBILE_BREAKPOINT)

  if (listen) {
    useEventListener(
      window,
      'scroll',
      () => {
        x.value = window.scrollX
        y.value = window.scrollY
      },
      {
        passive: true,
        capture: false
      }
    )
  }

  const scrollToNote = (to: number) => {
    const go = () => {
      const scrollOptions = isMobile.value
        ? {
            top: to
          }
        : {
            left: to
          }

      window.scrollTo(scrollOptions)
    }

    setTimeout(() => {
      go()
    }, 80)
  }

  return {
    x,
    y,
    isMobile,
    scrollToNote
  }
}
