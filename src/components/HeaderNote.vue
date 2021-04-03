<template>
  <header class="header-note">
    <router-link
      :to="{ name: 'Home' }"
      class="button is-small is-white back-button"
    >
      <img src="@/assets/icons/dark-left-arrow.svg" alt="go back left arrow" />
    </router-link>
    <router-link
      class="special-folder"
      :to="{ name: 'DraftNotes', params: { user, repo } }"
    >
      Draft
    </router-link>
    <router-link
      class="special-folder"
      :to="{ name: 'FleetingNotes', params: { user, repo } }"
    >
      inbox
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderNote',
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  }
})
</script>

<style scoped lang="scss">
.header-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  .special-folder {
    text-align: center;
  }

  img {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
