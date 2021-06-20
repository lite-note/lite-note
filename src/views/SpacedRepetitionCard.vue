<template>
  <div class="spaced-repetition-card repo-note">
    <flux-note
      key="spaced-repetition-card"
      :user="user"
      :repo="repo"
      :with-content="false"
    >
      <flip-card v-if="firstCard" :card="firstCard" />
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
      const [firstCard] = cards.value
      return firstCard
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
