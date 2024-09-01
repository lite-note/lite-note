import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'

import { prepareNoteCache } from '@/modules/note/cache/prepareNoteCache'
import { queryFileContent } from '@/modules/repo/services/repo'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

export const useOfflineNote = () => {
  const store = useUserRepoStore()
  const totalOfNotes = computed(() => store.files.length)

  const noteCompleted = ref(0)

  const cacheAllNotes = async () => {
    const isInitialized = store.user && store.repo && totalOfNotes.value > 0

    if (!isInitialized) {
      return
    }

    noteCompleted.value = 0

    for (const file of store.files) {
      noteCompleted.value++

      if (!file.sha) {
        continue
      }

      const { getCachedNote, saveCacheNote } = prepareNoteCache(
        file.sha,
        file.path
      )

      const isNoteCached = (await getCachedNote()) !== null

      if (isNoteCached) {
        continue
      }

      const contentFile = await queryFileContent(
        store.user,
        store.repo,
        file.sha
      )

      if (!contentFile) {
        return null
      }

      saveCacheNote(contentFile)
    }
  }
  const { execute, isLoading } = useAsyncState(cacheAllNotes, null, {
    immediate: false
  })

  return {
    cacheAllNotes: execute,
    isLoading,
    totalOfNotes,
    noteCompleted
  }
}
