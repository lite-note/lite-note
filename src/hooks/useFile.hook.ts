import { ref } from 'vue'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { getFileContent } from '@/modules/repo/services/repo'

export const useFile = (sha: string, retrieveContent = true) => {
  const store = useUserRepoStore()
  const { getCachedNote, saveCacheNote } = useNoteCache(sha)
  const fromCache = ref(false)

  const content = ref('')

  const getContent = async () => {
    const { render } = useMarkdown()
    const contentFile = await getFileContent(store.user, store.repo, sha)

    const cachedNote = await getCachedNote()

    fromCache.value = !!cachedNote

    if (cachedNote) {
      content.value = render(cachedNote.content)
      return
    }

    if (!contentFile) {
      return
    }
    saveCacheNote(contentFile)
    content.value = render(contentFile)
  }

  if (retrieveContent) {
    getContent()
  }

  return {
    content,
    getContent,
    fromCache
  }
}
