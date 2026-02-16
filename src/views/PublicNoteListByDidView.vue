<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import { usePublicNoteList } from "@/hooks/usePublicNoteList.hook"
import { getUniqueAka } from "@/modules/atproto/getAka"
import { computedAsync } from "@vueuse/core"
import { computed } from "vue"
import { vInfiniteScroll } from "@vueuse/components"

const props = defineProps<{ did: string }>()
const did = computed(() => props.did)

const { notes, isLoading, canLoadMore, onLoadMore } = usePublicNoteList(did)

const author = computedAsync(async () => getUniqueAka(did.value))
</script>

<template>
  <main class="public-note-list-view">
    <div class="header">
      <back-button class="back-button" :fallback="{ name: 'Home' }" />
      <h1>{{ author?.alias ?? did }}</h1>
    </div>
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
              <span v-if="note.publishedAt">
                {{ new Date(note.publishedAt).toLocaleDateString() }}
              </span>
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

  @media screen and (min-width: 769px) {
    overflow-y: auto;
  }
}
</style>
