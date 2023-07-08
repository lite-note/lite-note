<script setup lang="ts">
import FlipCard from '@/modules/card/components/FlipCard.vue'
import { Repetition } from '@/modules/card/hooks/useSpacedRepetitionCards'
import { ref } from 'vue'

const props = defineProps<{ cards: Repetition[] }>()
const emits = defineEmits<{
  success: [id: string]
  fail: [id: string]
}>()

const cards = ref(
  [...props.cards].sort((a, b) =>
    a.repetition.level > b.repetition.level ? -1 : 1
  )
)

const currentIndex = ref(0)

const goToNextCard = (success: boolean) => {
  const id = cards.value[currentIndex.value].repetition._id ?? ''

  if (success) {
    emits('success', id)
  } else {
    const failedCard = cards.value.at(currentIndex.value)
    if (failedCard) {
      cards.value.push(failedCard)
    }
    emits('fail', id)
  }

  currentIndex.value++
}
</script>

<template>
  <div class="flip-card-list">
    <h3 class="subtitle is-3">
      Level: {{ cards[currentIndex].repetition.level }}
    </h3>
    <h4>cards left: {{ cards.length - currentIndex }}</h4>

    <div v-if="currentIndex < cards.length">
      <flip-card
        v-for="(card, index) in cards"
        :key="card.repetition._id ?? ''"
        class="card"
        :style="{
          left: `${(index - currentIndex) * 550}px`
        }"
        :card="card.card"
        @success="goToNextCard(true)"
        @fail="goToNextCard(false)"
      />
    </div>
    <div v-else>No more cards to check!</div>
  </div>
</template>

<style scoped lang="scss">
.flip-card-list {
  overflow-x: hidden;
  flex: 1;

  .card {
    position: relative;
    transition: left 0.7s ease-out;
  }
}
</style>