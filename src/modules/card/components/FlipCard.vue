<template>
  <div class="flip-card" :class="{ flipped }" @click="flip">
    <div class="flip-card-inner">
      <div class="flip-card-front flip-card-content" v-html="card.front"></div>
      <div class="flip-card-back flip-card-content">
        <div class="back" v-html="card.back"></div>
        <hr />
        <div class="references" v-html="card.references"></div>
        <hr />
        <div class="buttons is-centered">
          <div class="button is-danger" @click.stop="success">failed</div>
          <div class="button is-success" @click.stop="fail">got it</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Card } from '../models/Card'

export default defineComponent({
  name: 'FlipCard',
  props: {
    card: { type: Object as PropType<Card>, required: true }
  },
  setup(_, context) {
    const flipped = ref(false)
    const flip = () => (flipped.value = !flipped.value)

    const success = () => context.emit('success')

    const fail = () => context.emit('fail')

    return { flip, flipped, success, fail }
  }
})
</script>

<style scoped lang="scss">
.flip-card {
  display: flex;
  background-color: transparent;
  padding: 0 1rem;
  margin: auto;

  &:hover {
    cursor: pointer;
  }

  .flip-card-inner {
    flex: 1;
    position: relative;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.4s;
    transform-style: preserve-3d;
    border-radius: 1rem;
  }

  &.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    backface-visibility: hidden;
  }

  .flip-card-content {
    width: 100%;
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
