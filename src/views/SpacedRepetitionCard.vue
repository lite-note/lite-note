<script lang="ts" setup>
import FluxNote from '@/components/FluxNote.vue'
import FlipCard from '@/modules/card/components/FlipCard.vue'
import { useSpacedRepetitionCards } from '@/modules/card/hooks/useSpacedRepetitionCards'
import { computed } from 'vue'

defineProps<{
  user: string
  repo: string
}>()

const { cards, isLoading, successRepetition, failRepetition } =
  useSpacedRepetitionCards()

const firstCard = computed(() => {
  const [repetitionCard] = cards.value
  return repetitionCard
})
</script>

<template>
  <div class="spaced-repetition-card repo-note">
    <flux-note
      key="spaced-repetition-card"
      :user="user"
      :repo="repo"
      :with-content="false"
    >
      <div id="tweet-1675991484753952769"></div>
      <section v-if="isLoading">Loading...</section>
      <section v-else-if="firstCard">
        <h3 class="subtitle is-3">Level: {{ firstCard.repetition.level }}</h3>
        <flip-card
          :card="firstCard.card"
          @success="() => successRepetition(firstCard.repetition._id ?? '')"
          @fail="() => failRepetition(firstCard.repetition._id ?? '')"
        />
      </section>
      <section v-else>No cards to review!</section>
    </flux-note>
  </div>
</template>

<style scoped lang="scss">
.spaced-repetition-card {
  display: flex;
  flex: 1;
}
</style>
