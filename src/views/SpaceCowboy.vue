<template>
  <main class="space-cowboy content">
    <p>
      <img src="@/assets/icons/alert.svg" alt="alert" />
      Oops, you've been lost!
      <img src="@/assets/icons/alert.svg" alt="alert" />
    </p>
    <p>A note link can't be used as URL.</p>
    <router-link class="button is-links" :to="{ name: 'Home' }"
      >return to homepage</router-link
    >
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SpaceCowboy'
})
</script>

<style scoped lang="scss">
.space-cowboy {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
