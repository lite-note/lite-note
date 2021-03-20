import { useRepo } from '@/hooks/useRepo.hook'
import { computed, Ref } from 'vue'

const FLEETING_NOTES_FOLDER = 'fleeting-notes'

export const useFleetingNotes = (owner: Ref<string>, repo: Ref<string>) => {
  const { tree } = useRepo(owner, repo)

  const fleetingNotes = computed(() =>
    tree.value.filter((file) => file.path?.startsWith(FLEETING_NOTES_FOLDER))
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
