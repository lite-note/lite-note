import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { computed } from 'vue'

export const useFolderNotes = (folder: string) => {
  const store = useUserRepoStore()

  const fleetingNotes = computed(() =>
    store.files.filter(
      (file) => file.path?.startsWith(folder) && file.path?.endsWith('.md')
    )
  )

  const content = computed(() =>
    fleetingNotes.value?.length
      ? fleetingNotes.value
          .map((note) => `- [${note.path}](${note.path})`)
          .join('\n')
      : ''
  )

  return {
    content
  }
}
