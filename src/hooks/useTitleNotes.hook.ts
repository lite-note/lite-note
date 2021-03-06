import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useNotes } from '@/modules/note/hooks/useNotes'
import { pathToNoteTitle } from '@/utils/noteTitle'
import { useTitle } from '@vueuse/core'
import { computed, watch } from 'vue'

export const generateTitle = (titles: string[]) => titles.join(' | ')

export const useTitleNotes = (prefix: string) => {
  const { stackedNotes } = useQueryStackedNotes()
  const { notes } = useNotes()
  const titleNotes = computed(() =>
    notes.value
      .filter((note) => stackedNotes.value.includes(note.sha ?? ''))
      .map((note) => pathToNoteTitle(note.path ?? ''))
  )

  const title = useTitle(generateTitle([prefix, ...titleNotes.value]))

  watch(titleNotes, () => {
    title.value = generateTitle([prefix, ...titleNotes.value])
  })
}
