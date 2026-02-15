<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import { Author, getAka } from "@/modules/atproto/getAka"
import { PublicNoteListItem } from "@/modules/note/models/Note"
import { computedAsync } from "@vueuse/core"
import { computed, ref } from "vue"
import { vInfiniteScroll } from "@vueuse/components"

const isLoading = ref(false)
const notes = ref<PublicNoteListItem[]>([])
const cursor = ref<string | null | undefined>(null)
const canLoadMore = computed(() => cursor.value !== undefined)

const onLoadMore = async () => {
  isLoading.value = true
  const noteAPI = new URL("/notes", "https://api.litenote.li212.fr")

  if (cursor.value) {
    noteAPI.searchParams.set("cursor", cursor.value)
  }

  const response = await fetch(noteAPI)

  const data: { notes: PublicNoteListItem[]; cursor: string | undefined } =
    await response.json()

  notes.value.push(...data.notes)
  cursor.value = data.cursor
  isLoading.value = false
}

const aka = computedAsync<Map<string, Author>>(async () => {
  if (notes.value.length === 0) {
    return new Map()
  }

  return getAka(new Set(notes.value.map((n) => n.did)))
}, new Map())

const getAlias = (did: string) =>
  aka.value.has(did) ? aka.value.get(did)?.alias : ""
</script>

<template>
  <main class="public-note-list-view">
    <h1>Remanso notes</h1>
    <div v-if="isLoading"></div>
    <div v-else>
      <ul
        class="list rounded-box shadow-sm"
        v-infinite-scroll="[onLoadMore, { canLoadMore: () => canLoadMore }]"
      >
        <li v-for="note in notes" class="list-row">
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
    <BackButton class="back-button" />
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

  .back-button {
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
