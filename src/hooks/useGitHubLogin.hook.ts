import { computed, ref } from 'vue'

import { DataType } from '@/data/DataType.enum'
import { GithubAccessToken } from '@/data/models/GithubAccessToken'
import { data } from '@/data/data'
import { confirmMessage } from '@/utils/notif'

const personalAccessTokenId = 'PAT'
const username = ref<string | null>(null)
const accessToken = ref<string | null>(null)

let init = true

export const useGitHubLogin = () => {
  const getAccessToken = async () => {
    const response = await data.get<
      DataType.GithubAccessToken,
      GithubAccessToken
    >(data.generateId(DataType.GithubAccessToken, personalAccessTokenId))
    username.value = response?.username || ''
    accessToken.value = response?.personalAccessToken || ''

    return response
  }

  if (init) {
    init = false
    getAccessToken()
  }

  const saveCredentials = async (username: string, token: string) => {
    const actualPAT = await getAccessToken()

    const personalAccessToken: GithubAccessToken = {
      ...actualPAT,
      _id: data.generateId(DataType.GithubAccessToken, personalAccessTokenId),
      $type: DataType.GithubAccessToken,
      username,
      personalAccessToken: token
    }

    await data.add(personalAccessToken)
    getAccessToken()
    confirmMessage('token saved!')
  }

  return {
    isLogged: !!username.value && !!accessToken.value,
    isReady: computed(() => accessToken.value !== null),
    username,
    accessToken,
    saveCredentials
  }
}
