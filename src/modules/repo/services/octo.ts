import { getAccessToken } from '@/modules/user/service/signIn'
import { Octokit } from '@octokit/rest'

export const getOctokit = async (): Promise<Octokit> => {
  const response = await getAccessToken()

  return new Octokit({
    auth: response?.token ?? ''
  })
}
