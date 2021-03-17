import { Ref, onMounted, ref, watch } from '@vue/runtime-core'

import { Octokit } from '@octokit/rest'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'

interface Tree {
  path?: string
  mode?: string
  type?: string
  sha?: string
  size?: number
  url?: string
}

export const useRepo = (owner: Ref<string>, repo: Ref<string>) => {
  const { accessToken } = useGitHubLogin()

  const octokit = new Octokit({
    auth: accessToken.value
  })

  const { render } = useMarkdown()
  const readme = ref<string | null>(null)
  const notFound = ref(false)
  const tree = ref<Tree[]>([])

  const retrieveRepo = async () => {
    if (!owner.value || !repo.value) {
      return
    }

    try {
      const README = await octokit.repos.getReadme({
        owner: owner.value,
        repo: repo.value
      })

      if (README) {
        readme.value = render(README.data.content)
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
        console.log(tree.value)
      }
    } catch (error) {
      notFound.value = true
    }
  }

  onMounted(() => retrieveRepo())

  watch([owner, repo], () => retrieveRepo())

  return {
    readme,
    notFound,
    tree
  }
}
