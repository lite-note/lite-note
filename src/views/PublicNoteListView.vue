<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import PublicNoteList from "@/components/PublicNoteList.vue"
import { usePublicNoteList } from "@/hooks/usePublicNoteList.hook"

const { notes, isLoading, canLoadMore, onLoadMore, getAuthor } =
  usePublicNoteList()
</script>

<template>
  <main class="public-note-list-view">
    <div class="header">
      <back-button class="back-button" :fallback="{ name: 'Home' }" />
      <h1>Remanso notes</h1>
    </div>
    <div v-if="isLoading"></div>
    <div v-else>
      <PublicNoteList
        :notes="notes"
        :can-load-more="canLoadMore"
        :on-load-more="onLoadMore"
      >
        <template #meta="{ note }">
          <router-link
            v-if="getAuthor(note.did)"
            :to="{
              name: 'PublicNoteListByDidView',
              params: { did: note.did },
            }"
            class="link link-hover"
          >
            {{ getAuthor(note.did) }}
          </router-link>

          <template v-if="note.publishedAt">
            <span>&nbsp;•&nbsp;</span>
            <span>{{ new Date(note.publishedAt).toLocaleDateString() }}</span>
          </template>
          <div v-else class="skeleton h-4 w-20"></div>
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
