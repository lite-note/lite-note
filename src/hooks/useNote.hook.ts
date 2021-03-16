import { Ref, ref } from '@vue/reactivity'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  watch
} from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

import { NOTE_WIDTH } from '@/constants/note-width'
import { noteEventBus } from '@/bus/noteBusEvent'
import { useFocus } from '@/hooks/useFocus.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useOverlay } from '@/hooks/useOverlay.hook'
import { useRepo } from '@/hooks/useRepo.hook'

const sanitizePath = (path: string) => {
  if (path.startsWith('./')) {
    return decodeURIComponent(path.replace('./', ''))
  }
  return decodeURIComponent(path)
}

export const useNote = (
  containerClass: string,
  user: Ref<string>,
  repo: Ref<string>
) => {
  const { push } = useRouter()
  const { query } = useRoute()
  const { isMobile } = useOverlay(false)
  const { scrollToFocusedNote } = useFocus()

  const stackedNotes = ref(
    query.stackedNotes
      ? Array.isArray(query.stackedNotes)
        ? query.stackedNotes
        : [query.stackedNotes]
      : []
  )

  const { readme, notFound, tree } = useRepo(user, repo)
  const { listenToClick } = useLinks('note-display')

  const titles = computed(() =>
    stackedNotes.value.reduce((obj: Record<string, string>, note) => {
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

      return obj
    }, {})
  )

  const unsubscribeLink = noteEventBus.addEventBusListener(
    ({ path, currentNoteSHA }) => {
      const currentFile = tree.value.find((file) => file.sha === currentNoteSHA)

      const absolutePathArray = currentFile?.path?.split('/') ?? []
      absolutePathArray?.pop()
      const absolutePath = absolutePathArray.join('/')

      const finalPath = absolutePath
        ? `${sanitizePath(absolutePath)}/${sanitizePath(path)}`
        : sanitizePath(path)

      const relativePath = sanitizePath(path)

      const file = tree.value.find(
        (file) => file.path === finalPath || file.path === relativePath
      )

      if (!file?.sha || stackedNotes.value.includes(file.sha)) {
        scrollToFocusedNote(file?.sha, stackedNotes.value)
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
        name: 'Home',
        params: {
          user: user.value,
          repo: repo.value
        },
        query: {
          stackedNotes: newStackedNotes
        }
      })

      stackedNotes.value = newStackedNotes

      scrollToFocusedNote(file.sha, stackedNotes.value)
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

  const resetStackedNotes = () => {
    stackedNotes.value = []
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
    notFound,
    stackedNotes,
    resetStackedNotes
  }
}
