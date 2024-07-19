<script setup lang="ts">
import { withDefaults } from 'vue'

withDefaults(
  defineProps<{
    light?: boolean
  }>(),
  {
    light: false
  }
)
</script>

<template>
  <div class="lite-loading">
    <img
      v-if="light"
      class="is-loading"
      src="/assets/loading-white.svg"
      alt="loading..."
    />
    <img v-else class="is-loading" src="/assets/loading.svg" alt="loading..." />
  </div>
</template>

<style scoped lang="scss">
.lite-loading {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  .is-loading {
    animation: spinAround 0.8s infinite linear;
  }
}
</style>
