import { ref } from 'vue'

import { useEventListener } from '@vueuse/core'

export const useOverlay = (listen = true) => {
  const x = ref(0)
  const body = document.querySelector('body')

  if (listen) {
    useEventListener(
      body,
      'scroll',
      (e) => {
        const target = e.target as HTMLElement
        x.value = target.scrollLeft
      },
      {
        passive: true,
        capture: false
      }
    )
  }

  const scrollTo = (to: number) => {
    body?.scroll({
      left: to
    })
  }

  return {
    x,
    scrollTo
  }
}
