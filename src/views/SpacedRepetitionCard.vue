<template>
  <div class="spaced-repetition-card repo-note">
    <flux-note
      key="spaced-repetition-card"
      :user="user"
      :repo="repo"
      :with-content="false"
    >
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="flip-card"
        :class="{ flipped }"
        @click="flip"
      >
        <div class="flip-card-inner">
          <div
            class="flip-card-front flip-card-content"
            v-html="card.front"
          ></div>
          <div class="flip-card-back flip-card-content">
            <div class="back" v-html="card.back"></div>
            <hr />
            <div class="references" v-html="card.references"></div>
          </div>
        </div>
      </div>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useSpacedRepetitionCards } from '@/modules/card/hooks/useSpacedRepetitionCards'
import { defineComponent, ref } from 'vue'
import FluxNote from '@/components/FluxNote.vue'

export default defineComponent({
  name: 'SpacedRepetitionCard',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup() {
    const { cards } = useSpacedRepetitionCards()
    const flipped = ref(false)

    const flip = () => (flipped.value = !flipped.value)

    return {
      cards,
      flipped,
      flip
    }
  }
})
</script>

<style scoped lang="scss">
.spaced-repetition-card {
  display: flex;
  flex: 1;
  padding: 0 1rem;

  .flip-card {
    background-color: transparent;
    width: 400px;
    height: 200px;
    margin: auto;

    &:hover {
      cursor: pointer;
    }
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.4s;
    transform-style: preserve-3d;
    border-radius: 1rem;
  }

  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-content {
    background-color: #ebebeb;
    color: var(--font-color);
    padding: 1rem;
    border-radius: 1rem;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
}
</style>
