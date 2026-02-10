<script setup lang="ts">
import { PublicNoteListItem } from "@/modules/note/models/Note"
import { useAsyncState } from "@vueuse/core"

const { state, isLoading } = useAsyncState<{
  notes: PublicNoteListItem[]
}>(
  async () => {
    const response = await fetch("https://api.litenote.li212.fr/notes")
    return response.json()
  },
  { notes: [] },
)
</script>

<template>
  <div v-if="isLoading"></div>
  <div class="public-note-view" v-else>
    <ul>
      <li v-for="note in state.notes">
        {{ note.did }}/{{ note.rkey }}: {{ note.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.public-note-view {
}
</style>
