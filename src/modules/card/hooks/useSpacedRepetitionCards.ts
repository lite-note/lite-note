import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { Card } from '@/modules/card/models/Card'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { asyncComputed } from '@vueuse/core'
import { computed, nextTick, watch } from 'vue'

export const useSpacedRepetitionCards = () => {
  const { renderString } = useMarkdown()
  const store = useUserRepoStore()
  const { listenToClick } = useLinks('flip-card')

  const cardFiles = computed(() =>
    store.files.filter(
      (file) => file.path?.startsWith('_cards') && file.path?.endsWith('.md')
    )
  )

  const cards = asyncComputed(async () => {
    const cards: Card[] = []

    for (const cardFile of cardFiles.value) {
      if (!cardFile.sha) {
        continue
      }

      const { getRawContent } = useFile(cardFile.sha, false)
      const content = await getRawContent()

      const [front, back, references] =
        decodeURIComponent(escape(atob(content ?? '')))?.split('___') ?? []

      cards.push({
        front: renderString(front),
        back: renderString(back),
        references: renderString(references)
      })
    }

    return cards
  }, [])

  watch(
    cards,
    () =>
      nextTick(() => {
        listenToClick()
      }),
    { immediate: true }
  )

  return { cards }
}
