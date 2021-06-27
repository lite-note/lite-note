<template>
  <div class="spaced-repetition-card repo-note">
    <flux-note
      key="spaced-repetition-card"
      :user="user"
      :repo="repo"
      :with-content="false"
    >
      <section v-if="firstCard">
        <h3 class="subtitle is-3">Level: {{ firstCard.repetition.level }}</h3>
        <flip-card :card="firstCard.card" />
      </section>
      <section v-else>No cards to review!</section>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useSpacedRepetitionCards } from '@/modules/card/hooks/useSpacedRepetitionCards'
import { computed, defineComponent } from 'vue'
import FluxNote from '@/components/FluxNote.vue'
import FlipCard from '@/modules/card/components/FlipCard.vue'

export default defineComponent({
  name: 'SpacedRepetitionCard',
  components: {
    FluxNote,
    FlipCard
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup() {
    const { cards } = useSpacedRepetitionCards()
    const firstCard = computed(() => {
      const [repetitionCard] = cards.value
      return repetitionCard
    })

    return {
      firstCard
    }
  }
})
</script>

<style scoped lang="scss">
.spaced-repetition-card {
  display: flex;
  flex: 1;
}
</style>
