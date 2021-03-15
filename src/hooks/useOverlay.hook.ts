import { MOBILE_BREAKPOINT } from '@/constants/mobile'
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export const useOverlay = (listen = true) => {
  const x = ref(0)
  const y = ref(0)
  const body = document.querySelector('body') as HTMLBodyElement
  const isMobile = ref((body?.clientWidth ?? 0) <= MOBILE_BREAKPOINT)

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
    console.log('scroll to note', to)

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

  return {
    x,
    y,
    isMobile,
    scrollToNote
  }
}
