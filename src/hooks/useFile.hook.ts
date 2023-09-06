import { computed, Ref, ref, toValue } from 'vue'

import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { prepareNoteCache } from '@/modules/note/cache/prepareNoteCache'
import { getFileContent } from '@/modules/repo/services/repo'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

export const useFile = (sha: Ref<string> | string, retrieveContent = true) => {
  const store = useUserRepoStore()

  const path = computed(() => {
    const file = store.files.find((file) => file.sha === toValue(sha))
    return file?.path ?? ''
  })

  const {
    render,
    renderFromUTF8,
    getRawContent: getRawContentFromFile
  } = useMarkdown(toValue(sha))
  const { getCachedNote, saveCacheNote } = prepareNoteCache(toValue(sha))
  const fromCache = ref(false)

  const rawContent = ref('')
  const content = computed(() =>
    rawContent.value ? renderFromUTF8(rawContent.value) : ''
  )

  const getEditedSha = async () => {
    const note = await getCachedNote()

    if (!note) {
      return null
    }

    return note.editedSha ?? null
  }

  const getCachedFileContent = async (): Promise<string | null> => {
    const cachedNote = await getCachedNote()

    fromCache.value = !!cachedNote

    if (cachedNote) {
      return cachedNote.content
    }

    const contentFile = await getFileContent(
      store.user,
      store.repo,
      toValue(sha)
    )

    if (!contentFile) {
      return null
    }

    saveCacheNote(contentFile)
    return contentFile
  }

  const getRawContent = async () => {
    const fileContent = await getCachedFileContent()

    if (!fileContent) {
      return null
    }

    return getRawContentFromFile(fileContent)
  }

  const getContent = async () => {
    const fileContent = await getCachedFileContent()

    if (!fileContent) {
      return null
    }

    return render(fileContent)
  }

  if (retrieveContent) {
    getCachedFileContent().then((fileContent) => {
      if (!fileContent) {
        return
      }

      rawContent.value = getRawContentFromFile(fileContent)
    })
  }

  return {
    path,
    content,
    rawContent,
    getRawContent,
    getContent,
    getCachedFileContent,
    getEditedSha,
    fromCache,
    saveCacheNote
  }
}
