import { Ref, ref, watch } from '@vue/runtime-core'

import { Octokit } from '@octokit/rest'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useNoteCache } from '@/modules/note/hooks/useNoteCache'

interface Tree {
  path?: string
  mode?: string
  type?: string
  sha?: string
  size?: number
  url?: string
}

const tree = ref<Tree[]>([])

export const useRepo = (
  owner: Ref<string>,
  repo: Ref<string>,
  retrieve = true
) => {
  const { getCachedNote, saveCacheNote } = useNoteCache('README')
  const { accessToken } = useGitHubLogin()
  const { render } = useMarkdown()

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const readme = ref<string | null>(null)
  const notFound = ref(false)

  const retrieveRepo = async () => {
    if (!owner.value || !repo.value) {
      return
    }
    const cachedReadme = await getCachedNote()

    try {
      if (cachedReadme) {
        readme.value = render(cachedReadme.content)
      }

      const README = await octokit.repos.getReadme({
        owner: owner.value,
        repo: repo.value
      })

      if (README) {
        readme.value = render(README.data.content)
        saveCacheNote(README.data.content)
      }

      const commits = await octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          repo: repo.value,
          owner: owner.value
        }
      )

      const lastCommit = commits.data.shift()

      if (!lastCommit) {
        return
      }

      const treeResponse = await octokit.request(
        'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
        {
          repo: repo.value,
          owner: owner.value,
          tree_sha: lastCommit.commit.tree.sha,
          recursive: 'true'
        }
      )

      if (treeResponse) {
        tree.value = treeResponse.data.tree.filter((t) => t.type === 'blob')
      }
    } catch (error) {
      if (!cachedReadme) {
        notFound.value = true
      }
    }
  }

  if (retrieve) {
    retrieveRepo()
  }

  watch([owner, repo], () => retrieveRepo())

  return {
    readme,
    notFound,
    tree
  }
}
