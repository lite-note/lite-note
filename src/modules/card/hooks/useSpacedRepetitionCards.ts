import { DataType } from '@/data/DataType.enum'
import { data } from '@/data/data'
import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { Card } from '@/modules/card/models/Card'
import { RepetitionCard } from '@/modules/card/models/RepetitionCard'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { decodeBase64ToUTF8 } from '@/utils/decodeBase64ToUTF8'
import { asyncComputed } from '@vueuse/core'
import { isAfter } from 'date-fns'
import { computed, nextTick, watch } from 'vue'

interface Repetition {
  repetition: RepetitionCard
  card: Card
}

export const useSpacedRepetitionCards = () => {
  const { toHTML } = useMarkdown()
  const store = useUserRepoStore()
  const { listenToClick } = useLinks('flip-card')

  const cardFiles = computed(() =>
    store.files.filter(
      (file) => file.path?.startsWith('_cards') && file.path?.endsWith('.md')
    )
  )

  const cards = asyncComputed(async () => {
    const cards: Repetition[] = []

    for (const cardFile of cardFiles.value) {
      if (!cardFile.sha) {
        continue
      }

      const repetitionId = data.generateId(
        DataType.RepetitionCard,
        cardFile.sha
      )

      let repetition = await data.get<DataType.RepetitionCard, RepetitionCard>(
        repetitionId
      )

      if (!repetition) {
        const newRepetition: RepetitionCard = {
          _id: repetitionId,
          $type: DataType.RepetitionCard,
          level: 1,
          repeatDate: new Date()
        }
        await data.add<DataType.RepetitionCard>(newRepetition)
        repetition = (await data.get<DataType.RepetitionCard, RepetitionCard>(
          repetitionId
        )) as RepetitionCard
      }

      if (isAfter(new Date(repetition.repeatDate), new Date())) {
        continue
      }

      const { getRawContent } = useFile(cardFile.sha, false)
      const content = await getRawContent()

      const [front, back, references] =
        decodeBase64ToUTF8(content ?? '').split('___') ?? []

      cards.push({
        repetition,
        card: {
          front: toHTML(front),
          back: toHTML(back),
          references: toHTML(references)
        }
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
