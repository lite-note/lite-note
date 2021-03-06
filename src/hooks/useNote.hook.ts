import { computed, onMounted, onUnmounted, watch } from '@vue/runtime-core'

import { NOTE_WIDTH } from '@/constants/note-width'
import { noteEventBus } from '@/bus/noteEventBus'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { resolvePath } from '@/modules/repo/services/resolvePath'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { pathToNotePathTitle } from '@/utils/noteTitle'

export const useNote = (containerClass: string) => {
  const store = useUserRepoStore()
  const { isMobile } = useOverlay(false)
  const { stackedNotes, addStackedNote } = useQueryStackedNotes()

  const titles = computed(() =>
    stackedNotes.value?.reduce((obj: Record<string, string>, note) => {
      if (!note) {
        return obj
      }
      const filePath = store.files.find((file) => file.sha === note)?.path ?? ''

      obj[note] = pathToNotePathTitle(filePath)

      return obj
    }, {})
  )

  const unsubscribeLink = noteEventBus.addEventBusListener(
    ({ path, currentNoteSHA }) => {
      const currentFile = store.files.find(
        (file) => file.sha === currentNoteSHA
      )

      const finalPath = resolvePath(currentFile?.path ?? '', path)

      const file = store.files.find((file) => file.path === finalPath)
      if (!file?.sha) {
        return
      }

      addStackedNote(currentNoteSHA ?? '', file.sha)
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
      container.style.width = `${
        NOTE_WIDTH * (stackedNotes.value.length + 1)
      }px`
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
