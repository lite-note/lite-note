import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { watch } from 'vue'

export const useBackLinks = () => {
  const store = useUserRepoStore()

  watch(store, () => {
    if (!store.userSettings?.backlink) {
      return
    }

    console.log("let's go backlinks!")
  })
}
