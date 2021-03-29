import { computed, onMounted, onUnmounted, watch } from '@vue/runtime-core'

import { NOTE_WIDTH } from '@/constants/note-width'
import { noteEventBus } from '@/bus/noteEventBus'
import { useFocus } from '@/hooks/useFocus.hook'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useRouter } from 'vue-router'
import { resolvePath } from '@/modules/repo/services/resolvePath'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

export const useNote = (containerClass: string) => {
  const store = useUserRepoStore()
  const { push, currentRoute } = useRouter()
  const { isMobile } = useOverlay(false)
  const { scrollToFocusedNote } = useFocus()
  const { stackedNotes, updateQueryStackedNotes } = useQueryStackedNotes()

  const titles = computed(() =>
    stackedNotes.value?.reduce((obj: Record<string, string>, note) => {
      if (!note) {
        return obj
      }
      const filePath = store.files.find((file) => file.sha === note)?.path ?? ''

      const fileNames = filePath.split('.')

      fileNames.pop()
      obj[note] = fileNames
        .join('.')
        .split('/')
        .filter((path) => !path.includes('README'))
        .join('/')
        .replaceAll('-', ' ')

      return obj
    }, {})
  )

  const unsubscribeLink = noteEventBus.addEventBusListener(
    ({ user, repo, path, currentNoteSHA }) => {
      const currentFile = store.files.find(
        (file) => file.sha === currentNoteSHA
      )

      const finalPath = resolvePath(currentFile?.path ?? '', path)

      const file = store.files.find((file) => file.path === finalPath)

      if (!file?.sha || stackedNotes.value.includes(file.sha)) {
        scrollToFocusedNote(file?.sha)
        return
      }

      const getStackedNotes = () => {
        if (!file?.sha) {
          return []
        }

        if (!currentNoteSHA) {
          return [file.sha]
        }

        const [splittedStackedNotes] = stackedNotes.value
          .join(';')
          .split(currentNoteSHA)

        return [
          ...splittedStackedNotes.replaceAll(';;', ';').split(';'),
          currentNoteSHA,
          file.sha
        ].filter((sha) => !!sha)
      }

      const newStackedNotes = getStackedNotes()

      push({
        name: currentRoute.value.name ?? 'Home',
        params: {
          user,
          repo
        },
        query: {
          stackedNotes: newStackedNotes
        }
      })

      updateQueryStackedNotes(newStackedNotes)
      scrollToFocusedNote(file.sha)
    }
  )

  const resizeContainer = () => {
    const container = document.querySelector(
      `.${containerClass}`
    ) as HTMLElement | null
    if (!container) {
      return
    }
    if (isMobile.value) {
      container.style.height = `${(stackedNotes.value.length + 1) * 100}vh`
    } else {
      container.style.width = `${NOTE_WIDTH *
        (stackedNotes.value.length + 1)}px`
    }
  }

  onMounted(() => {
    resizeContainer()
  })

  onUnmounted(() => {
    unsubscribeLink()
  })

  watch(stackedNotes, resizeContainer, {
    immediate: true
  })

  return {
    titles
  }
}
