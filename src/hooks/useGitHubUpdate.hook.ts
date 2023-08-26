import { getOctokit } from '@/modules/repo/services/octo'
import { encodeUTF8ToBase64 } from '@/utils/decodeBase64ToUTF8'
import { confirmMessage, errorMessage } from '@/utils/notif'

export const useGitHubUpdate = ({
  user,
  repo
}: {
  user: string
  repo: string
}) => {
  const updateFile = async ({
    content,
    path,
    sha
  }: {
    content: string
    path: string
    sha: string
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

      console.log(response)

      return response?.data.content?.sha ?? null
    } catch (error) {
      errorMessage('File could not be saved')
    }

    return null
  }

  return {
    updateFile
  }
}
