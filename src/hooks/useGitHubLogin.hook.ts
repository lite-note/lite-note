import { computed, ref } from 'vue'

import { confirmMessage } from '@/utils/notif'
import { GithubToken } from '@/modules/user/interfaces/GithubToken'
import { getAccessToken, saveAccessToken } from '@/modules/user/service/signIn'

const username = ref<string | null>(null)
const accessToken = ref<string | null>(null)

let init = true

export const useGitHubLogin = () => {
  const saveAccessTokenToLocal = async () => {
    const response = await getAccessToken()
    username.value = response?.username || ''
    accessToken.value = response?.token || ''
  }

  if (init) {
    init = false
    saveAccessTokenToLocal()
  }

  const saveCredentials = async (githubToken: GithubToken) => {
    const accessToken = await saveAccessToken(githubToken)

    await saveAccessTokenToLocal()
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
