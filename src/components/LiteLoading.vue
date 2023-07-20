<template>
  <div class="lite-loading">
    <img class="is-loading" src="@/assets/icons/loading.svg" alt="loading..." />
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
