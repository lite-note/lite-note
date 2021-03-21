import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  watch
} from '@vue/runtime-core'

import { NOTE_WIDTH } from '@/constants/note-width'
import { Ref } from '@vue/reactivity'
import { noteEventBus } from '@/bus/noteBusEvent'
import { useFocus } from '@/hooks/useFocus.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useRepo } from '@/hooks/useRepo.hook'
import { useRouter } from 'vue-router'
import { resolvePath } from '@/modules/repo/services/resolvePath'

export const useNote = (
  containerClass: string,
  user: Ref<string>,
  repo: Ref<string>
) => {
  const { push, currentRoute } = useRouter()
  const { isMobile } = useOverlay(false)
  const { scrollToFocusedNote } = useFocus()
  const { stackedNotes, updateQueryStackedNotes } = useQueryStackedNotes()
  const { readme, notFound, tree } = useRepo(user, repo)
  const { listenToClick } = useLinks('note-display')

  const titles = computed(() =>
    stackedNotes.value?.reduce((obj: Record<string, string>, note) => {
      if (!note) {
        return obj
      }
      const filePath = tree.value.find((file) => file.sha === note)?.path ?? ''

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
    ({ path, currentNoteSHA }) => {
      const currentFile = tree.value.find((file) => file.sha === currentNoteSHA)

      const finalPath = resolvePath(currentFile?.path ?? '', path)

      const file = tree.value.find((file) => file.path === finalPath)

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
          user: user.value,
          repo: repo.value
        },
        query: {
          stackedNotes: newStackedNotes
        }
      })

      updateQueryStackedNotes(newStackedNotes)
      scrollToFocusedNote(file.sha)
    }
  )

  watch([readme, user, repo], () => {
    nextTick(() => {
      listenToClick()
    })
  })

  const resizeContainer = () => {
    const element = document.querySelector(
      `.${containerClass}`
    ) as HTMLElement | null
    if (!element) {
      return
    }
    if (isMobile.value) {
      element.style.height = `${(stackedNotes.value.length + 1) * 100}vh`
    } else {
      element.style.width = `${NOTE_WIDTH * (stackedNotes.value.length + 1)}px`
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
    titles,
    readme,
    notFound
  }
}
