<script setup lang="ts">
import { computed } from "vue"
import { useUserRepoStore } from "../modules/repo/store/userRepo.store"

const store = useUserRepoStore()

const fontFamilies = computed(() => store.userSettings?.fontFamilies ?? [])
const sortedFontFamilies = computed(() =>
  [...fontFamilies.value].sort((a, b) => a.localeCompare(b)),
)
</script>

<template>
  <select
    v-if="sortedFontFamilies.length > 0"
    class="select select-sm"
    :value="store.userSettings?.chosenFontFamily"
    @change="store.setFontFamily(($event.target as HTMLSelectElement).value)"
  >
    <option v-for="font in sortedFontFamilies" :key="font" :value="font">
      {{ font }}
    </option>
  </select>
</template>
