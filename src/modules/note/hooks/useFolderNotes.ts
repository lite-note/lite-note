import { useRepo } from '@/hooks/useRepo.hook'
import { computed, Ref } from 'vue'

export const useFolderNotes = (
  folder: string,
  owner: Ref<string>,
  repo: Ref<string>
) => {
  const { tree } = useRepo(owner, repo)

  const fleetingNotes = computed(() =>
    tree.value.filter(
      (file) => file.path?.startsWith(folder) && file.path?.endsWith('.md')
    )
  )

  const content = computed(() =>
    fleetingNotes.value.length
      ? fleetingNotes.value
          .map((note) => `- [${note.path}](${note.path})`)
          .join('\n')
      : ''
  )

  return {
    content
  }
}
