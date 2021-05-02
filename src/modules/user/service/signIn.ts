import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { GithubAccessToken } from '@/data/models/GithubAccessToken'
import { GithubToken } from '@/modules/user/interfaces/GithubToken'
import { GithubTokenError } from '@/modules/user/interfaces/GithubTokenError'
import { Octokit } from '@octokit/rest'
import { addMilliseconds } from 'date-fns'

const AUTHENTICATION_SERVER = 'https://litenote.li212.fr'
const personalTokenId = 'token'

export const signIn = async (
  code: string
): Promise<GithubToken | GithubTokenError> => {
  const authenticationServerURL = new URL(AUTHENTICATION_SERVER)
  authenticationServerURL.searchParams.set('code', code)

  const response = await fetch(authenticationServerURL.toString())
  const body = (await response.json()) as GithubToken | GithubTokenError

  return body
}

export const refreshToken = async () => {
  const accessToken = await data.get<
    DataType.GithubAccessToken,
    GithubAccessToken
  >(data.generateId(DataType.GithubAccessToken, personalTokenId))

  if (!accessToken) {
    return null
  }

  console.log(
    new Date(accessToken.expirationDate) >= new Date(),
    accessToken.expirationDate,
    new Date()
  )

  if (new Date(accessToken.expirationDate) >= new Date()) {
    const authenticationServerURL = new URL(AUTHENTICATION_SERVER)
    authenticationServerURL.searchParams.set('type', 'refresh')

    const response = await fetch(authenticationServerURL.toString(), {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: accessToken.refreshToken,
        grant_type: 'refresh_token'
      })
    })
    const githubToken = (await response.json()) as
      | GithubToken
      | GithubTokenError

    if ('error' in githubToken) {
      return null
    }

    return await saveAccessToken(githubToken)
  }

  return accessToken
}

export const getAccessToken = async () => {
  const response = await data.get<
    DataType.GithubAccessToken,
    GithubAccessToken
  >(data.generateId(DataType.GithubAccessToken, personalTokenId))

  return response
}

export const saveAccessToken = async (githubToken: GithubToken) => {
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

  await data.add(accessToken)

  return accessToken
}
