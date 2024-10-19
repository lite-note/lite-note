<script setup lang="ts">
import { useOfflineNote } from '@/hooks/useOfflineNote.hook'

const { cacheAllNotes, isLoading, totalOfNotes, noteCompleted } =
  useOfflineNote()

const confirmBeforeCachingAllNotes = () => {
  confirm('Do you want to cache all notes?')
  cacheAllNotes()
}
</script>

<template>
  <div v-if="isLoading" class="cache-all-notes">
    <div>{{ noteCompleted }}/{{ totalOfNotes }}</div>
    <progress
      :value="noteCompleted"
      class="progress"
      :max="totalOfNotes"
    ></progress>
  </div>
  <button v-else class="button" @click="() => confirmBeforeCachingAllNotes()">
    <img src="/assets/offline.svg" alt="offline cloud" />
  </button>
</template>

<style scoped lang="scss">
.cache-all-notes {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
