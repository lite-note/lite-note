import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { GithubAccessToken } from '@/data/models/GithubAccessToken'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'
import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
import { GithubToken } from '@/modules/user/interfaces/GithubToken'
import { GithubTokenError } from '@/modules/user/interfaces/GithubTokenError'
import { Octokit } from '@octokit/rest'
import { addMilliseconds } from 'date-fns'

const personalTokenId = 'token'

const GITHUB_URL = 'https://github.com/login/oauth/access_token'

export const refreshToken = async () => {
  const accessToken = await data.get<
    DataType.GithubAccessToken,
    GithubAccessToken
  >(data.generateId(DataType.GithubAccessToken, personalTokenId))
  if (!accessToken) {
    return
  }

  console.log(
    new Date(accessToken.expirationDate) >= new Date(),
    accessToken.expirationDate,
    new Date()
  )

  if (new Date(accessToken.expirationDate) >= new Date()) {
    const response = await fetch(GITHUB_URL, {
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
      return
    }

    const expirationDate = addMilliseconds(
      new Date(),
      githubToken.expires_in
    ).toISOString()

    const refreshTokenExpirationDate = addMilliseconds(
      new Date(),
      githubToken.refresh_token_expires_in
    ).toISOString()

    const updatedAccessToken: GithubAccessToken = {
      ...accessToken,
      token: githubToken.access_token,
      expiresIn: githubToken.expires_in,
      expirationDate,
      refreshToken: githubToken.refresh_token,
      refreshTokenExpiresIn: githubToken.refresh_token_expires_in,
      refreshTokenExpirationDate
    }

    await data.add<DataType.GithubAccessToken>({
      ...updatedAccessToken
    })
  }
}

export const getFiles = async (
  owner: string,
  repo: string
): Promise<RepoFile[]> => {
  if (!owner || !repo) {
    return []
  }

  const { accessToken } = useGitHubLogin()

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo
  })

  const lastCommit = commits.data.shift()

  if (!lastCommit) {
    return []
  }

  const treeResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
    {
      owner,
      repo,
      tree_sha: lastCommit.commit.tree.sha,
      recursive: 'true'
    }
  )

  return treeResponse?.data.tree.filter((t) => t.type === 'blob') ?? []
}

export const getMainReadme = async (owner: string, repo: string) => {
  if (!owner || !repo) {
    return null
  }

  const { render } = useMarkdown()
  const { getCachedNote, saveCacheNote } = useNoteCache('README')

  const cachedReadme = await getCachedNote()

  try {
    const { accessToken } = useGitHubLogin()
    const octokit = new Octokit({
      auth: accessToken.value
    })

    const README = await octokit.repos.getReadme({
      owner,
      repo
    })

    if (README) {
      saveCacheNote(README.data.content)
      return render(README.data.content)
    }
  } catch (error) {
    console.warn(error)
    if (cachedReadme) {
      return render(cachedReadme.content)
    }
  }

  return null
}

export const getUserSettingsContent = async (
  user: string,
  repo: string,
  files: RepoFile[]
): Promise<UserSettings | null> => {
  const configFile = files.find((file) => file.path === '.litenote.json')

  if (!configFile?.sha) {
    return null
  }
  const content = await getFileContent(user, repo, configFile.sha)

  if (!content) {
    return null
  }

  return JSON.parse(atob(content)) as UserSettings
}

export const getFileContent = async (
  user: string,
  repo: string,
  sha: string
) => {
  const { accessToken } = useGitHubLogin()

  const octokit = new Octokit({
    auth: accessToken.value
  })

  if (!user || !repo) {
    null
  }

  const file = await octokit.request(
    'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
    {
      owner: user,
      repo: repo,
      file_sha: sha
    }
  )

  return file?.data.content ?? null
}
