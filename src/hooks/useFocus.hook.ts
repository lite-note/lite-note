import { NOTE_WIDTH } from '@/constants/note-width'
import { nextTick } from 'vue'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useWindowSize } from '@vueuse/core'

export const useFocus = () => {
  const { height } = useWindowSize()
  const { scrollToNote, isMobile } = useOverlay(false)
  const { stackedNotes } = useQueryStackedNotes()

  const scrollToFocusedNote = (sha?: string) => {
    if (!sha) {
      return
    }

    nextTick(() => {
      const index = stackedNotes.value.findIndex((noteSHA) => noteSHA === sha)

      if (isMobile.value) {
        const element = document.querySelector(`.note-${sha}`) as HTMLElement
        const top = (index + 1) * (element?.clientHeight ?? height.value)
        scrollToNote(top)
      } else {
        const left = (index + 1) * NOTE_WIDTH
        scrollToNote(left)
      }
    })
  }

  return {
    scrollToFocusedNote
  }
}
