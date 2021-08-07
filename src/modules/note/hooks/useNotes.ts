import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { computed } from 'vue'

export const useNotes = () => {
  const store = useUserRepoStore()

  const notes = computed(() => {
    console.log(store.files)

    return store.files
  })

  return {
    notes
  }
}
