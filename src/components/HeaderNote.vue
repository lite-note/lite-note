<template>
  <header class="header-note">
    <router-link :to="{ name: 'Home' }">
      <img src="@/assets/icons/dark-left-arrow.svg" alt="go back left arrow" />
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderNote'
})
</script>

<style scoped lang="scss">
.header-note {
  img:hover {
    cursor: pointer;
  }
}
</style>
