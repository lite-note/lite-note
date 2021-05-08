import { computed, onMounted, ref } from '@vue/runtime-core'

import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'

const BOOKMARK_WIDTH = 2

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
    const { stackedNotes } = useQueryStackedNotes()
    const noteElement = document.querySelector(
      `.${className}`
    ) as HTMLElement | null

    if (!noteElement) {
      return
    }
    noteHeight.value = noteElement.clientHeight

    if (isMobile.value) {
      noteElement.style.top = `0`
    } else {
      noteElement.style.left = `${(index + 1) * BOOKMARK_WIDTH}rem`

      const stackedNoteContainers = document.querySelectorAll(
        '.stacked-note'
      ) as NodeListOf<HTMLElement>

      stackedNoteContainers.forEach((stackedNote, ind) => {
        stackedNote.style.right = `calc(-${NOTE_WIDTH}px + ${
          (stackedNotes.value.length - ind) * BOOKMARK_WIDTH
        }rem)`
      })
    }
  })

  return {
    displayNoteOverlay
  }
}
