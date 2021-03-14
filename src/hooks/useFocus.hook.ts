import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { nextTick } from 'vue'
import { LocationQueryValue } from 'vue-router'

export const useFocus = () => {
  const { scrollToNote } = useOverlay(false)

  const scrollToFocusedNote = (
    stackedNotes: LocationQueryValue[],
    sha?: string
  ) => {
    if (!sha) {
      return
    }
    nextTick(() => {
      const index = stackedNotes.findIndex((noteSHA) => noteSHA === sha)
      const left = index * NOTE_WIDTH

      scrollToNote(left)
    })
  }

  return {
    scrollToFocusedNote
  }
}
