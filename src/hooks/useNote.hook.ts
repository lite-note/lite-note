import { nextTick, onUnmounted, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

import { noteEventBus } from '@/bus/noteBusEvent'
import { ref } from '@vue/reactivity'
import { useLinks } from '@/hooks/useLinks.hook'
import { useRepo } from '@/hooks/useRepo.hook'

const sanitizePath = (path: string) => {
  if (path.startsWith('./')) {
    return decodeURIComponent(path.replace('./', ''))
  }
  return decodeURIComponent(path)
}

export const useNote = (user: string, repo: string) => {
  const { push } = useRouter()
  const { readme, notFound, tree } = useRepo(user, repo)
  const { listenToClick } = useLinks('note-display')
  const { query } = useRoute()

  const stackedNotes = ref(
    query.stackedNotes
      ? Array.isArray(query.stackedNotes)
        ? query.stackedNotes
        : [query.stackedNotes]
      : []
  )

  const unsubscribe = noteEventBus.addEventBusListener(
    ({ path, currentNoteSHA }) => {
      const currentFile = tree.value.find((file) => file.sha === currentNoteSHA)

      const absolutePathArray = currentFile?.path?.split('/') ?? []
      absolutePathArray?.pop()
      const absolutePath = absolutePathArray.join('/')

      const finalPath = absolutePath
        ? `${sanitizePath(absolutePath)}/${sanitizePath(path)}`
        : sanitizePath(path)

      const file = tree.value.find((file) => file.path === finalPath)

      if (!file?.sha || stackedNotes.value.includes(file.sha)) {
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
        name: 'Note',
        query: {
          stackedNotes: newStackedNotes
        }
      })

      stackedNotes.value = newStackedNotes
    }
  )

  watch(readme, () => {
    if (readme.value) {
      nextTick(() => {
        listenToClick()
      })
    }
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return {
    readme,
    notFound,
    stackedNotes
  }
}
