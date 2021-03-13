import { onMounted, ref } from '@vue/runtime-core'

import MarkdownIt from 'markdown-it'
import { request } from '@octokit/request'

const md = new MarkdownIt()

export const useRepo = (owner: string, repo: string) => {
  const readme = ref<string | null>(null)

  onMounted(async () => {
    const README = await request('GET /repos/{owner}/{repo}/readme', {
      repo,
      owner
    })

    if (README) {
      readme.value = md.render(
        decodeURIComponent(escape(atob(README.data.content)))
      )
    }

    const commits = await request('GET /repos/{owner}/{repo}/commits', {
      owner,
      repo
    })

    const lastCommit = commits.data.shift()

    if (!lastCommit) {
      return
    }

    const tree = await request(
      'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
      {
        owner,
        repo,
        tree_sha: lastCommit.commit.tree.sha,
        recursive: 'true'
      }
    )

    console.log(tree.data.tree.filter((t) => t.type === 'blob'))
  })

  return {
    readme
  }
}
