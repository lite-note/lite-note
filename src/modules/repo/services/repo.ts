import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'
import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
import { getOctokit } from '@/modules/repo/services/octo'

export const getFiles = async (
  owner: string,
  repo: string
): Promise<RepoFile[]> => {
  if (!owner || !repo) {
    return []
  }
  const octokit = await getOctokit()

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
    const octokit = await getOctokit()

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
  const octokit = await getOctokit()

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
