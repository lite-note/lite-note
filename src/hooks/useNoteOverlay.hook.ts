import { computed, onMounted } from '@vue/runtime-core'

import { useOverlay } from '@/hooks/useOverlay.hook'

const BOOKMARK_WIDTH = 2
const NOTE_WIDTH = 620

export const useNoteOverlay = (className: string, index: number) => {
  const { x } = useOverlay()
  const displayNoteOverlay = computed(() => x.value > index * NOTE_WIDTH)

  onMounted(() => {
    const noteElement = document.querySelector(
      `.${className}`
    ) as HTMLElement | null

    if (!noteElement) {
      return
    }

    noteElement.style.left = `${(index + 1) * BOOKMARK_WIDTH}rem`
  })

  return {
    displayNoteOverlay
  }
}
