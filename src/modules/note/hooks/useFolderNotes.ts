import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { computed } from 'vue'

export const useFolderNotes = (folders: string[]) => {
  const store = useUserRepoStore()

  const fleetingNotes = computed(() =>
    store.files.filter(
      (file) =>
        folders.some((folder) => file.path?.startsWith(folder)) &&
        file.path?.endsWith('.md')
    )
  )

  const content = computed(() =>
    fleetingNotes.value?.length > 0
      ? fleetingNotes.value
          .map((note) => {
            const firstFolder = note.path?.split('/').shift()

            return `- [${note.path?.replace(`${firstFolder}/`, '')}](${
              note.path
            })`
          })
          .join('\n')
      : ''
  )

  return {
    content
  }
}
