import { onMounted, ref } from '@vue/runtime-core'

import { request } from '@octokit/request'
import { useMarkdown } from '@/hooks/useMarkdown.hook'

interface Tree {
  path?: string
  mode?: string
  type?: string
  sha?: string
  size?: number
  url?: string
}

export const useRepo = (owner: string, repo: string) => {
  const { render } = useMarkdown()
  const readme = ref<string | null>(null)
  const notFound = ref(false)
  const tree = ref<Tree[]>([])

  onMounted(async () => {
    try {
      const README = await request('GET /repos/{owner}/{repo}/readme', {
        repo,
        owner
      })

      if (README) {
        readme.value = render(README.data.content)
      }

      const commits = await request('GET /repos/{owner}/{repo}/commits', {
        owner,
        repo
      })

      const lastCommit = commits.data.shift()

      if (!lastCommit) {
        return
      }

      const treeResponse = await request(
        'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
        {
          owner,
          repo,
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
  })

  return {
    readme,
    notFound,
    tree
  }
}
