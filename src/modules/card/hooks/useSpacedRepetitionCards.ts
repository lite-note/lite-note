import { DataType } from '@/data/DataType.enum'
import { data } from '@/data/data'
import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { Card } from '@/modules/card/models/Card'
import { RepetitionCard } from '@/modules/card/models/RepetitionCard'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { decodeBase64ToUTF8 } from '@/utils/decodeBase64ToUTF8'
import { useAsyncState } from '@vueuse/core'
import { addDays, isAfter } from 'date-fns'
import { computed, nextTick, watch } from 'vue'

const MAX_LEVEL = 10

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
      (file) =>
        file.path !== undefined &&
        file.path.startsWith('_cards') &&
        file.path.endsWith('.md')
    )
  )

  const {
    state: cards,
    isReady,
    execute
  } = useAsyncState(
    async () => {
      const cards: Repetition[] = []

      for (const cardFile of cardFiles.value) {
        if (!cardFile.sha) {
          continue
        }

        const repetition = await data.getOrCreate<
          DataType.RepetitionCard,
          RepetitionCard
        >(data.generateId(DataType.RepetitionCard, cardFile.path), {
          $type: DataType.RepetitionCard,
          level: 1,
          repeatDate: new Date()
        })

        if (isAfter(new Date(repetition.repeatDate), new Date())) {
          continue
        }

        const { getRawContent } = useFile(cardFile.sha, false)
        const content = (await getRawContent()) ?? ''

        const [front, back, references] =
          decodeBase64ToUTF8(content).split('___') ?? []

        cards.push({
          repetition,
          card: {
            front: toHTML(front),
            back: toHTML(back),
            references: toHTML(references)
          }
        })
      }

      console.log(cards)

      return cards
    },
    [],
    { immediate: false }
  )

  const failRepetition = async (cardId: string) => {
    const repetition = await data.get<DataType.RepetitionCard, RepetitionCard>(
      cardId
    )
    if (!repetition) {
      return
    }

    await data.update<DataType.RepetitionCard, RepetitionCard>({
      ...repetition,
      repeatDate: addDays(new Date(), 1)
    })

    await execute()
  }

  const successRepetition = async (cardId: string) => {
    const repetition = await data.get<DataType.RepetitionCard, RepetitionCard>(
      cardId
    )
    if (!repetition) {
      return
    }

    await data.update<DataType.RepetitionCard, RepetitionCard>({
      ...repetition,
      level: Math.min(repetition.level, MAX_LEVEL),
      repeatDate: addDays(new Date(), repetition.level)
    })

    await execute()
  }

  watch(
    cards,
    () =>
      nextTick(() => {
        listenToClick()
      }),
    { immediate: true }
  )

  watch(cardFiles, () => execute(), { immediate: true })

  return { cards, failRepetition, successRepetition, isLoading: !isReady }
}
