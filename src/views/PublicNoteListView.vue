<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import { usePublicNoteList } from "@/hooks/usePublicNoteList.hook"
import { vInfiniteScroll } from "@vueuse/components"

const { notes, isLoading, canLoadMore, onLoadMore, getAlias } =
  usePublicNoteList()
</script>

<template>
  <main class="public-note-list-view">
    <h1>Remanso notes</h1>
    <back-button class="back-button" :fallback="{ name: 'Home' }" />
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
              <router-link
                v-if="getAlias(note.did)"
                :to="{
                  name: 'PublicNoteListByDidView',
                  params: { did: note.did },
                }"
                class="link link-hover"
              >
                {{ getAlias(note.did) }}
              </router-link>
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
  </main>
</template>

<style scoped lang="scss">
.public-note-list-view {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;

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
