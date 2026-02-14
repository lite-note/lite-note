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
  <main class="public-note-list-view">
    <h1>Lite public notes</h1>
    <div v-if="isLoading"></div>
    <div v-else>
      <ul class="list rounded-box shadow-sm">
        <li v-for="note in state.notes" class="list-row">
          <div class="list-col">
            <router-link
              :to="{
                name: 'PublicNoteView',
                params: { did: note.did, rkey: note.rkey },
              }"
              class="btn btn-link"
              >{{ note.title }}</router-link
            >

            <div class="text-xs opacity-80 alias">
              <span v-if="getAlias(note.did)">
                {{ getAlias(note.did) }}
              </span>
              <span v-if="note.publishedAt"
                >&nbsp;•&nbsp;{{
                  new Date(note.publishedAt).toLocaleDateString()
                }}
              </span>
              <div v-else class="skeleton h-4 w-20"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <router-link
      :to="{ name: 'Home' }"
      class="button is-small is-white back-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-narrow-left"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="9" y2="16" />
        <line x1="5" y1="12" x2="9" y2="8" />
      </svg>
      return home
    </router-link>
  </main>
</template>

<style scoped lang="scss">
.public-note-list-view {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 1rem;

  h1 {
    margin-top: 1rem;
  }

  a.back-button {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  li {
    display: flex;

    .list-col {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    a {
      text-align: left;
    }

    .alias {
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
