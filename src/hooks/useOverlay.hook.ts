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

  const scrollToNote = (to: number, wait = false) => {
    const go = () => {
      if (isMobile.value) {
        body.scroll({
          top: to
        })
      } else {
        body.scroll({
          left: to
        })
      }
    }

    if (wait) {
      setTimeout(() => {
        go()
      }, 100)
    } else {
      go()
    }
  }

  return {
    x,
    y,
    isMobile,
    scrollToNote
  }
}
