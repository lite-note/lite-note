import { NOTE_WIDTH } from '@/constants/note-width'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { readonly, ref } from '@vue/reactivity'
import { useWindowSize } from '@vueuse/core'
import { nextTick } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const stackedNotes = ref<string[]>([])

let initial = true

export const useQueryStackedNotes = () => {
  const { query } = useRoute()
  const { push, currentRoute } = useRouter()
  const store = useUserRepoStore()
  const { height } = useWindowSize()
  const { scrollToNote, isMobile } = useOverlay(false)

  const scrollToFocusedNote = (sha?: string, backToTop?: boolean) => {
    if (backToTop) {
      scrollToNote(0)
      return
    }

    if (!sha) {
      return
    }

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

  const initResetStackedNote = () => {
    stackedNotes.value = Array.isArray(query.stackedNotes)
      ? (query.stackedNotes as string[])
      : ([query.stackedNotes]
          .map((n) => n?.toString())
          .filter((n) => !!n) as string[])
  }

  if (initial) {
    initial = false
    initResetStackedNote()
  }

  const updateQueryStackedNotes = (newStackedNotes: string[]) =>
    (stackedNotes.value = newStackedNotes)

  const addStackedNote = (currentSHA: string, sha: string) => {
    if (stackedNotes.value.includes(sha)) {
      scrollToFocusedNote(sha)
      return
    }

    const getStackedNotes = () => {
      if (!sha) {
        return []
      }

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
      name: currentRoute.value.name ?? 'Home',
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
    resetStackedNotes: () => initResetStackedNote(),
    scrollToFocusedNote
  }
}
