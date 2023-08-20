import { getOctokit } from '@/modules/repo/services/octo'
import { encodeUTF8ToBase64 } from '@/utils/decodeBase64ToUTF8'
import { confirmMessage, errorMessage } from '@/utils/notif'

export const useGitHubUpdate = ({
  user,
  repo,
  sha
}: {
  user: string
  repo: string
  sha: string
}) => {
  const updateFile = async ({
    content,
    path
  }: {
    content: string
    path: string
  }) => {
    try {
      const octokit = await getOctokit()

      const response = await octokit.request(
        `PUT /repos/{owner}/{repo}/contents/{path}`,
        {
          owner: user,
          repo,
          path,
          message: `Updating ${path} from Lite Note`,
          content: encodeUTF8ToBase64(content),
          sha
        }
      )

      confirmMessage('file saved on GitHub')

      return response?.data.commit.sha ?? null
    } catch (error) {
      errorMessage('File could not be saved')
    }

    return null
  }

  return {
    updateFile
  }
}
