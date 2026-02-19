import { watchEffect } from "vue"

import { useUserRepoStore } from "@/modules/repo/store/userRepo.store"
import { downloadFont } from "@/utils/downloadFont"

const DEFAULT_FONT_POLICY = '"Libertinus Serif", serif'
const DEFAULT_FONT_SIZE = "16px"

export const useUserSettings = () => {
  const store = useUserRepoStore()

  watchEffect(() => {
    const root = document.documentElement

    const fontFamily = store.userSettings?.chosenFontFamily
    const fontSize = store.userSettings?.chosenFontSize

    downloadFont(fontFamily || DEFAULT_FONT_POLICY)
    root.style.setProperty("--font-size", fontSize || DEFAULT_FONT_SIZE)
  })
}
