import { ref } from 'vue'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { Octokit } from '@octokit/rest'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'

export const useFile = (
  owner: string,
  repo: string,
  sha: string,
  retrieveContent = true
) => {
  const { getCachedNote, saveCacheNote } = useNoteCache(sha)
  const { accessToken } = useGitHubLogin()
  const fromCache = ref(false)

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const content = ref('')

  const getFileContent = async () => {
    const file = await octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner,
        repo,
        file_sha: sha
      }
    )

    return file?.data.content
  }

  const getContent = async () => {
    const { render } = useMarkdown()
    const contentFile = await getFileContent()

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
    getFileContent,
    fromCache
  }
}
