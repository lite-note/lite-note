import { computed, onMounted, ref } from '@vue/runtime-core'

import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'

const BOOKMARK_WIDTH = 2
const BOOKMARK_HEIGHT = 2.5

export const useNoteOverlay = (className: string, index: number) => {
  const { x, y, isMobile } = useOverlay()
  const noteHeight = ref(0)
  const displayNoteOverlay = computed(() => {
    if (isMobile.value) {
      return y.value > index * noteHeight.value
    } else {
      return x.value > index * NOTE_WIDTH
    }
  })

  onMounted(() => {
    const noteElement = document.querySelector(
      `.${className}`
    ) as HTMLElement | null

    if (!noteElement) {
      return
    }
    noteHeight.value = noteElement.clientHeight

    if (isMobile.value) {
      noteElement.style.top = `${(index + 1) * BOOKMARK_HEIGHT}rem`
    } else {
      noteElement.style.left = `${(index + 1) * BOOKMARK_WIDTH}rem`
    }
  })

  return {
    displayNoteOverlay
  }
}
