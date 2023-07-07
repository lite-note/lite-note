<script lang="ts" setup>
import { ref } from 'vue'
import { Card } from '../models/Card'

defineProps<{ card: Card }>()
const emit = defineEmits<{ success: []; fail: [] }>()

const flipped = ref(false)
const flip = () => (flipped.value = !flipped.value)

const success = () => emit('success')

const fail = () => emit('fail')
</script>

<template>
  <div class="flip-card" :class="{ flipped }" @click="flip">
    <div class="flip-card-inner">
      <div class="flip-card-front flip-card-content" v-html="card.front"></div>
      <div class="flip-card-back flip-card-content">
        <div class="back" v-html="card.back"></div>
        <hr />
        <div class="references" v-html="card.references"></div>
        <hr />
        <div class="actions">
          <p>Did you remember this?</p>
          <div class="buttons is-centered">
            <div class="button is-warning" @click.stop="fail">failed</div>
            <div class="button is-success" @click.stop="success">got it</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$border-radius: 0.5rem;

.flip-card {
  display: flex;
  background-color: transparent;
  padding: 0 1rem;
  margin: auto;
  user-select: none;
  transition: 0.3s;
  perspective: 1500px;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .flip-card-inner {
    flex: 1;
    position: relative;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.4s;
    transform-style: preserve-3d;
    border-radius: $border-radius;
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
    background-color: #ede4e0;
    color: var(--font-color);
    padding: 1rem;
    border-radius: $border-radius;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
}

.actions {
  text-align: center;

  p {
    margin-bottom: 0.5rem;
  }
}
</style>
