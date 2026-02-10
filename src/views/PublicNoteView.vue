<script setup lang="ts">
import { getAka } from "@/modules/atproto/getAka"
import { PublicNoteListItem } from "@/modules/note/models/Note"
import { computedAsync, useAsyncState } from "@vueuse/core"

const { state, isLoading } = useAsyncState<{
  notes: PublicNoteListItem[]
}>(
  async () => {
    const response = await fetch("https://api.litenote.li212.fr/notes")
    return response.json()
  },
  { notes: [] },
)

const aka = computedAsync<Map<string, string>>(async () => {
  if (state.value.notes.length === 0) {
    return new Map()
  }
  return getAka(new Set(state.value.notes.map((n) => n.did)))
}, new Map())

const getAlias = (did: string) => aka.value.get(did) ?? ""
</script>

<template>
  <div v-if="isLoading"></div>
  <div class="public-note-view" v-else>
    <ul>
      <li v-for="note in state.notes">
        {{ getAlias(note.did) }}: {{ note.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.public-note-view {
}
</style>
