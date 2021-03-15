import { LocationQueryValue, useRoute } from 'vue-router'
import { computed, nextTick } from 'vue'

import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useWindowSize } from '@vueuse/core'

export const useFocus = () => {
  const { height } = useWindowSize()
  const { scrollToNote, isMobile } = useOverlay(false)
  const { query } = useRoute()

  const initialStackedNotes = computed(() =>
    query.stackedNotes
      ? Array.isArray(query.stackedNotes)
        ? query.stackedNotes
        : [query.stackedNotes]
      : []
  )

  const scrollToFocusedNote = (
    sha?: string,
    stackedNotes: LocationQueryValue[] = initialStackedNotes.value
  ) => {
    if (!sha) {
      return
    }
    nextTick(() => {
      const index = stackedNotes.findIndex((noteSHA) => noteSHA === sha)
      if (isMobile.value) {
        const element = document.querySelector(`.note-${sha}`) as HTMLElement
        const top = (index + 1) * (element?.clientHeight ?? height.value)
        scrollToNote(top)
      } else {
        const left = index * NOTE_WIDTH
        scrollToNote(left)
      }
    })
  }

  return {
    scrollToFocusedNote
  }
}
