import { useWindowSize } from '@vueuse/core'
import { nextTick, readonly, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

const stackedNotes = ref<string[]>([])

let initial = true

export const useQueryStackedNotes = () => {
  const { query } = useRoute()
  const { push, currentRoute } = useRouter()
  const store = useUserRepoStore()
  const { height } = useWindowSize()
  const { scrollToNote, isMobile } = useOverlay(false)

  const scrollToFocusedNote = (sha: string) => {
    nextTick(() => {
      const index = stackedNotes.value.findIndex((noteSHA) => noteSHA === sha)

      const hasOneStackedNote = stackedNotes.value.length === 1

      if (isMobile.value) {
        const element = document.querySelector(`.note-${sha}`) as HTMLElement
        const top = (index + 1) * (element?.clientHeight ?? height.value)
        scrollToNote(top, hasOneStackedNote)
      } else {
        const margin = index * 44
        const left = (index + 1) * NOTE_WIDTH - margin
        scrollToNote(left, hasOneStackedNote)
      }
    })
  }

  const resetStackedNotes = () => {
    stackedNotes.value = Array.isArray(query.stackedNotes)
      ? (query.stackedNotes as string[])
      : ([query.stackedNotes]
          .map((n) => n?.toString())
          .filter((n) => !!n) as string[])
  }

  if (initial) {
    initial = false
    resetStackedNotes()
  }

  const updateQueryStackedNotes = (newStackedNotes: string[]) =>
    (stackedNotes.value = newStackedNotes)

  const addStackedNote = (currentSHA: string, sha: string) => {
    if (stackedNotes.value.includes(sha)) {
      scrollToFocusedNote(sha)
      return
    }

    const getStackedNotes = () => {
      if (!currentSHA) {
        return [sha]
      }

      const [splittedStackedNotes] = stackedNotes.value
        .join(';')
        .split(currentSHA)

      return [
        ...splittedStackedNotes.replaceAll(';;', ';').split(';'),
        currentSHA,
        sha
      ].filter((sha) => !!sha)
    }

    const newStackedNotes = getStackedNotes()

    push({
      name: currentRoute.value.name ?? 'FluxNoteView',
      params: {
        user: store.user,
        repo: store.repo
      },
      query: {
        stackedNotes: newStackedNotes
      }
    })

    updateQueryStackedNotes(newStackedNotes)
    scrollToFocusedNote(sha)
  }

  return {
    stackedNotes: readonly(stackedNotes),
    updateQueryStackedNotes,
    addStackedNote,
    resetStackedNotes,
    scrollToFocusedNote,
    scrollToTop: () => scrollToNote(0)
  }
}
