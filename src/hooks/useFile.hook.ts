import { ref } from 'vue'
import { request } from '@octokit/request'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { Octokit } from '@octokit/rest'

export const useFile = (owner: string, repo: string, sha: string) => {
  const { accessToken } = useGitHubLogin()

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const content = ref('')

  const getContent = async () => {
    const { render } = useMarkdown()
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
    content.value = render(file.data.content)
  }

  getContent()

  return {
    content
  }
}
