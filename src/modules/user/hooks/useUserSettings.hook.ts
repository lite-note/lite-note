import { watchEffect } from 'vue'

import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { downloadGoogleFont } from '@/utils/downloadGoogleFont'

const DEFAULT_FONT_POLICY = 'Courier Prime, monospace'
const DEFAULT_FONT_SIZE = '16px'

export const useUserSettings = () => {
  const store = useUserRepoStore()

  watchEffect(() => {
    if (store.userSettings === undefined) {
      return
    }

    const root = document.documentElement

    const fontFamily = store.userSettings?.fontFamily
    const fontSize = store.userSettings?.fontSize

    downloadGoogleFont(fontFamily || DEFAULT_FONT_POLICY)
    root.style.setProperty('--font-size', fontSize || DEFAULT_FONT_SIZE)
  })
}
