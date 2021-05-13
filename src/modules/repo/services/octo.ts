import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { needToRefreshToken, refreshToken } from '@/modules/user/service/signIn'
import { Octokit } from '@octokit/rest'

let refreshingToken = false
let octokit = new Octokit()

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getOctokit = async (): Promise<Octokit> => {
  const { accessToken } = useGitHubLogin()
  octokit = new Octokit({
    auth: accessToken.value
  })

  if (refreshingToken) {
    await sleep(100)
    return getOctokit()
  }

  if (!refreshingToken) {
    refreshingToken = true
    if (await needToRefreshToken()) {
      const accessToken = await refreshToken()
      if (accessToken) {
        octokit = new Octokit({
          auth: accessToken.token
        })
      }
    }
    refreshingToken = false
  }

  return octokit
}
