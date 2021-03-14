import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { computed, nextTick } from 'vue'
import { LocationQueryValue, useRoute } from 'vue-router'

export const useFocus = () => {
  const { scrollToNote } = useOverlay(false)
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
      const left = index * NOTE_WIDTH

      scrollToNote(left)
    })
  }

  return {
    scrollToFocusedNote
  }
}
