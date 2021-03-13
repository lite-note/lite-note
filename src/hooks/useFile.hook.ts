import { ref } from 'vue'
import { request } from '@octokit/request'
import { useMarkdown } from '@/hooks/useMarkdown.hook'

export const useFile = (owner: string, repo: string, sha: string) => {
  const content = ref('')

  const getContent = async () => {
    const { render } = useMarkdown()
    const file = await request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner,
        repo,
        file_sha: sha
      }
    )

    if (!file) {
      return
    }
    content.value = render(file.data.content)
  }

  getContent()

  return {
    content
  }
}
