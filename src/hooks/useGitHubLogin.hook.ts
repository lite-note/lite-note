import { computed, ref } from 'vue'

import { DataType } from '@/data/DataType.enum'
import { data } from '@/data/data'
import { confirmMessage } from '@/utils/notif'
import { GithubAccessToken } from '@/data/models/GithubAccessToken'
import { Octokit } from '@octokit/rest'
import { GithubToken } from '@/modules/user/interfaces/GithubToken'
import { addMilliseconds } from 'date-fns'

const personalTokenId = 'token'
const username = ref<string | null>(null)
const accessToken = ref<string | null>(null)

let init = true

export const useGitHubLogin = () => {
  const getAccessToken = async () => {
    const response = await data.get<
      DataType.GithubAccessToken,
      GithubAccessToken
    >(data.generateId(DataType.GithubAccessToken, personalTokenId))
    username.value = response?.username || ''
    accessToken.value = response?.token || ''

    return response
  }

  if (init) {
    init = false
    getAccessToken()
  }

  const saveCredentials = async (githubToken: GithubToken) => {
    const actualPAT = await getAccessToken()

    const expirationDate = addMilliseconds(
      new Date(),
      githubToken.expires_in
    ).toISOString()

    const refreshTokenExpirationDate = addMilliseconds(
      new Date(),
      githubToken.refresh_token_expires_in
    ).toISOString()

    const accessToken: GithubAccessToken = {
      ...actualPAT,
      _id: data.generateId(DataType.GithubAccessToken, personalTokenId),
      $type: DataType.GithubAccessToken,
      token: githubToken.access_token,
      expiresIn: githubToken.expires_in,
      expirationDate,
      refreshToken: githubToken.refresh_token,
      refreshTokenExpiresIn: githubToken.refresh_token_expires_in,
      refreshTokenExpirationDate,
      username: ''
    }

    const octokit = new Octokit({
      auth: accessToken.token
    })

    const user = await octokit.request('GET /user')
    accessToken.username = user.data.login
    username.value = accessToken.username

    await data.add(accessToken)
    getAccessToken()
    confirmMessage(`${accessToken.username} is logged in!`)
  }

  return {
    isLogged: !!accessToken.value,
    isReady: computed(() => accessToken.value !== null),
    username,
    accessToken,
    saveCredentials
  }
}
