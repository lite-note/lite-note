import { watchEffect } from 'vue'

import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { downloadGoogleFont } from '@/utils/downloadGoogleFont'

const DEFAULT_FONT_POLICY = 'Courier Prime, monospace'

const LIGHT_FONT_COLOR = '#4a4a4a'
const LIGHT_BACKGROUND = '#ffffff'

const DARK_FONT_COLOR = '#f7f1e3'
const DARK_BACKGROUND = '#202020'

export const useUserSettings = () => {
  const store = useUserRepoStore()

  watchEffect(() => {
    if (store.userSettings === undefined) {
      return
    }

    const fontFamily = store.userSettings?.fontFamily
    const fontSize = store.userSettings?.fontSize
    const mode = store.userSettings?.mode
    const root = document.documentElement

    downloadGoogleFont(fontFamily || DEFAULT_FONT_POLICY)

    root.style.setProperty('--font-size', fontSize || '16px')

    switch (mode) {
      case 'dark':
        root.style.setProperty('--font-color', DARK_FONT_COLOR)
        root.style.setProperty('--background-color', DARK_BACKGROUND)
        break
      case 'light':
      default:
        root.style.setProperty('--font-color', LIGHT_FONT_COLOR)
        root.style.setProperty('--background-color', LIGHT_BACKGROUND)
        break
    }
  })
}
