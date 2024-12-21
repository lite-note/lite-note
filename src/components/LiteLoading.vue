<script setup lang="ts">
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
    <span class="loading loading-spinner"></span>
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

@keyframes spinAround {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
