import { computed, ref } from 'vue'

import { confirmMessage } from '@/utils/notif'
import { getAccessToken, saveAccessToken } from '@/modules/user/service/signIn'
import { GithubToken } from '@/modules/user/interfaces/GithubToken'

const username = ref<string | null>(null)
const accessToken = ref<string | null>(null)

let init = true

const saveAccessTokenToLocal = async () => {
  const response = await getAccessToken()
  username.value = response?.username || ''
  accessToken.value = response?.token || ''
}

const saveCredentials = async (token: GithubToken): Promise<void> => {
  const accessToken = await saveAccessToken(token)

  await saveAccessTokenToLocal()
  confirmMessage(`${accessToken.username} is logged in!`)
}

export const useGitHubLogin = () => {
  if (init) {
    init = false
    saveAccessTokenToLocal()
  }

  return {
    isLogged: !!accessToken.value,
    isReady: computed(() => accessToken.value !== null),
    username,
    accessToken,
    saveCredentials
  }
}
