import { useFile } from '@/hooks/useFile.hook'
import { useRepo } from '@/hooks/useRepo.hook'
import { resolvePath } from '@/modules/repo/services/resolvePath'
import { computed, Ref } from 'vue'

const SRC_PREFIX = 'data:image/png;base64,'

export const useImages = (
  user: Ref<string>,
  repo: Ref<string>,
  sha: string
) => {
  const { tree } = useRepo(user, repo, false)

  const currentFilePath = computed(
    () => tree.value.find((file) => file.sha === sha)?.path
  )

  const images = document.querySelectorAll(`.note-${sha} img`)

  images.forEach(async (image) => {
    if (currentFilePath.value) {
      const src = image.getAttribute('src')
      if (!src || src.startsWith(SRC_PREFIX)) {
        return
      }

      const imageFilePath = resolvePath(
        currentFilePath.value,
        image.getAttribute('src') ?? ''
      )

      const imageFile = tree.value.find((file) => file.path === imageFilePath)

      if (!imageFile?.sha) {
        return
      }
      const { getFileContent } = useFile(
        user.value,
        repo.value,
        imageFile.sha,
        false
      )

      const fileContent = await getFileContent()
      image.setAttribute('src', `${SRC_PREFIX} ${fileContent}`)
    }
  })
}
