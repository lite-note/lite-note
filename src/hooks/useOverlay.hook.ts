import { useEventListener, useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import { MOBILE_BREAKPOINT } from '@/constants/mobile'

export const useOverlay = (listen = true) => {
  const body = document.body
  const x = ref(0)
  const y = ref(0)
  const { width } = useWindowSize()
  const isMobile = computed(() => width.value <= MOBILE_BREAKPOINT)

  if (listen) {
    useEventListener(
      body,
      'scroll',
      (event) => {
        const target = event.target as HTMLElement
        x.value = target.scrollLeft
        y.value = target.scrollTop
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

      body.scroll(scrollOptions)
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
