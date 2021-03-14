import { onMounted, ref } from 'vue'

import { useEventListener } from '@vueuse/core'

export const useOverlay = () => {
  const x = ref(0)

  onMounted(() => {
    const element = document.querySelector('body')

    useEventListener(
      element,
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
  })
  return {
    x
  }
}
