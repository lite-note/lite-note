import { Octokit } from '@octokit/rest'
import { useAsyncState } from '@vueuse/core'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

export const useRepos = () => {
  const { username, accessToken } = useGitHubLogin()
  const repos = useAsyncState(async () => {
    if (!accessToken.value || !username.value) {
      return []
    }

    const octokit = new Octokit({
      auth: accessToken.value
    })

    const repoList = await octokit.request('GET /search/repositories', {
      q: `user:${username.value}`,
      per_page: 100
    })

    return repoList.data.items.map((item) => item.name)
  }, [])

  return {
    repos: repos.state,
    isReady: repos.isReady
  }
}
