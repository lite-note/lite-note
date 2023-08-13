import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { prepareNoteCache } from '@/modules/note/cache/useNoteCache'
import { getFileContent } from '@/modules/repo/services/repo'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { ref } from 'vue'

export const useFile = (sha: string, retrieveContent = true) => {
  const { render } = useMarkdown(sha)
  const store = useUserRepoStore()
  const { getCachedNote, saveCacheNote } = prepareNoteCache(sha)
  const fromCache = ref(false)

  const content = ref('')
  const rawContent = ref('')

  const getRawContent = async () => {
    const fileContent = await getCachedFileContent()
    if (!fileContent) {
      return
    }
    content.value = render(fileContent)
    rawContent.value = fileContent
    return rawContent.value
  }

  const getContent = async () => {
    const fileContent = await getCachedFileContent()
    if (!fileContent) {
      return
    }
    content.value = render(fileContent)
    rawContent.value = fileContent
    return content.value
  }

  const getCachedFileContent = async (): Promise<string | null> => {
    const cachedNote = await getCachedNote()

    fromCache.value = !!cachedNote

    if (cachedNote) {
      return cachedNote.content
    }

    const contentFile = await getFileContent(store.user, store.repo, sha)

    if (!contentFile) {
      return null
    }

    saveCacheNote(contentFile)
    return contentFile
  }

  if (retrieveContent) {
    getContent()
  }

  return {
    content,
    getRawContent,
    getContent,
    getCachedFileContent,
    fromCache
  }
}
