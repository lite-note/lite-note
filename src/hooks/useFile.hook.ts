import { ref } from 'vue'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { Octokit } from '@octokit/rest'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'

export const useFile = (owner: string, repo: string, sha: string) => {
  const { getCachedNote, saveCacheNote } = useNoteCache(sha)
  const { accessToken } = useGitHubLogin()
  const fromCache = ref(false)

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const content = ref('')

  const getContent = async () => {
    const { render } = useMarkdown()
    const cachedNote = await getCachedNote()

    fromCache.value = !!cachedNote

    if (cachedNote) {
      content.value = render(cachedNote.content)
      return
    }

    const file = await octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner,
        repo,
        file_sha: sha
      }
    )

    if (!file) {
      return
    }

    saveCacheNote(file.data.content)
    content.value = render(file.data.content)
  }

  getContent()

  return {
    content,
    fromCache
  }
}
