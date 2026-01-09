import { computed, onMounted, Ref, ref, toValue } from "vue"

import { NOTE_WIDTH } from "@/constants/note-width"
import { useOverlay } from "@/hooks/useOverlay.hook"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"

const BOOKMARK_WIDTH = 2
const OFFSET = 32 // stacked-note padding

export const useNoteOverlay = (
  className: string,
  index: Ref<number> | number,
) => {
  const { x, y, isMobile } = useOverlay()
  const noteHeight = ref(0)

  const displayNoteOverlay = computed(() => {
    const valueIndex = toValue(index)

    if (isMobile.value) {
      return y.value > valueIndex * noteHeight.value
    } else {
      return x.value > valueIndex * NOTE_WIDTH - valueIndex * OFFSET
    }
  })

  onMounted(() => {
    const { stackedNotes } = useRouteQueryStackedNotes()
    const noteElement = document.querySelector(
      `.${className}`,
    ) as HTMLElement | null

    if (!noteElement) {
      return
    }
    noteHeight.value = noteElement.clientHeight

    if (isMobile.value) {
      noteElement.style.top = `0`
    } else {
      noteElement.style.left = `${(toValue(index) + 1) * BOOKMARK_WIDTH}rem`

      const stackedNoteContainers = document.querySelectorAll(
        ".stacked-note",
      ) as NodeListOf<HTMLElement>

      stackedNoteContainers.forEach((stackedNote, ind) => {
        stackedNote.style.right = `calc(-${NOTE_WIDTH}px + ${
          (stackedNotes.value.length - ind) * BOOKMARK_WIDTH
        }rem)`
      })
    }
  })

  return {
    displayNoteOverlay,
  }
}
