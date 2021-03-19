import { Octokit } from '@octokit/rest'
import { RepoBase } from '@/modules/interfaces/RepoBase'
import { useAsyncState } from '@vueuse/core'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

export const useRepos = () => {
  const { username, accessToken } = useGitHubLogin()
  const repos = useAsyncState<RepoBase[]>(async () => {
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

    return repoList.data.items.map((item) => ({
      id: `${item.id}`,
      name: item.name,
      isPrivate: item.private
    }))
  }, [])

  return {
    repos: repos.state,
    isReady: repos.isReady
  }
}
