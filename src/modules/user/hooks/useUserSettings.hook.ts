import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { watchEffect } from 'vue'

export const useUserSettings = () => {
  const store = useUserRepoStore()

  watchEffect(() => {
    const fontFamily = store.userSettings?.fontFamily
    const root = document.documentElement
    if (fontFamily) {
      root.style.setProperty('--font-family', fontFamily)
    } else {
      root.style.setProperty('--font-family', "'Courier Prime', monospace")
    }
  })
}
