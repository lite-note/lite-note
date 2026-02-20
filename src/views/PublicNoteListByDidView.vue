<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import PublicNoteList from "@/components/PublicNoteList.vue"
import { usePublicNoteList } from "@/hooks/usePublicNoteList.hook"
import { getAuthor } from "@/modules/atproto/getAuthor"
import { computedAsync } from "@vueuse/core"
import { computed } from "vue"

const props = defineProps<{ did: string }>()
const did = computed(() => props.did)

const { notes, isLoading, canLoadMore, onLoadMore } = usePublicNoteList(did)

const author = computedAsync(async () => getAuthor(did.value))
</script>

<template>
  <main class="public-note-list-view">
    <div class="header">
      <back-button class="back-button" :fallback="{ name: 'Home' }" />
      <h1>{{ author?.handle ?? did }}</h1>
    </div>
    <div v-if="isLoading"></div>
    <div v-else>
      <PublicNoteList
        :notes="notes"
        :can-load-more="canLoadMore"
        :on-load-more="onLoadMore"
      >
        <template #meta="{ note }">
          <span v-if="note.publishedAt">
            {{ new Date(note.publishedAt).toLocaleDateString() }}
          </span>
        </template>
      </PublicNoteList>
    </div>
  </main>
</template>

<style scoped lang="scss">
.public-note-list-view {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;

  .header {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    flex: 1;
    text-align: center;
    margin-bottom: 0;
  }

  .back-button {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  @media screen and (min-width: 769px) {
    overflow-y: auto;
  }
}
</style>
