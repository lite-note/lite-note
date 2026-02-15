<script setup lang="ts">
import { useATProtoLinks } from "@/hooks/useATProtoLinks.hook"
import { markdownBuilder } from "@/hooks/useMarkdown.hook"
import BackButton from "@/components/BackButton.vue"
import StackedPublicNote from "@/components/StackedPublicNote.vue"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { getUniqueAka } from "@/modules/atproto/getAka"
import type { PublicNoteRecord } from "@/modules/atproto/publicNote.types"
import { withATProtoImages } from "@/modules/atproto/withATProtoImages"
import { getUrl } from "@/modules/atproto/getUrl"
import { downloadFont } from "@/utils/downloadFont"
import { computedAsync } from "@vueuse/core"
import { computed, nextTick, watch } from "vue"
import { useResizeContainer } from "@/hooks/useResizeContainer.hook"

const props = defineProps<{ did: string; rkey: string }>()
const did = computed(() => props.did)
const rkey = computed(() => props.rkey)

const author = computedAsync(async () => getUniqueAka(did.value))
const url = computedAsync(async () =>
  getUrl({ did: did.value, rkey: rkey.value }),
)

const noteRecord = computedAsync(async () =>
  url.value
    ? ((await fetch(url.value).then()).json() as Promise<PublicNoteRecord>)
    : null,
)

watch(noteRecord, () => {
  if (noteRecord.value?.value.fontFamily) {
    downloadFont(noteRecord.value.value.fontFamily)
  }

  if (noteRecord.value?.value.fontSize) {
    const root = document.documentElement
    root.style.setProperty(
      "--font-size",
      `${noteRecord.value.value.fontSize}pt`,
    )
  }
})

const { toHTML } = markdownBuilder()

const title = computed(() => noteRecord.value?.value.title)
const content = computed(() =>
  noteRecord.value?.value.content && author.value
    ? toHTML(
        withATProtoImages(noteRecord.value.value.content, {
          endpoint: author.value.endpoint,
          did: did.value,
        }),
      )
    : "",
)

const publishedAt = computed(() =>
  noteRecord.value?.value.publishedAt
    ? new Date(noteRecord.value?.value.publishedAt).toLocaleDateString()
    : null,
)

const { stackedNotes, scrollToFocusedNote } = useRouteQueryStackedNotes()
const { listenToClick } = useATProtoLinks("note-display")
useResizeContainer("note-container", stackedNotes)

watch(
  content,
  async () => {
    await nextTick()
    listenToClick()
  },
  { immediate: true },
)
</script>

<template>
  <div class="public-note-view repo-note note-container">
    <div class="note article">
      <div class="repo-title-breadcrumb">
        <a
          class="title-stacked-note-link"
          @click.prevent="scrollToFocusedNote()"
          v-if="author && title"
          >{{ title }}</a
        >
      </div>

      <span class="badge badge-author" v-if="author && content">
        <router-link
          :to="{ name: 'PublicNoteListByDidView', params: { did: did } }"
          class="link link-hover"
        >
          {{ author.alias }}
        </router-link>
        <span v-if="publishedAt">&nbsp;•&nbsp;{{ publishedAt }}</span>
      </span>
      <article class="note-display" v-html="content"></article>

      <back-button
        :fallback="{ name: 'PublicNoteListByDidView', params: { did } }"
        :prefer-fallback="false"
      />
    </div>
    <stacked-public-note
      v-for="(stackedNote, index) in stackedNotes"
      :key="stackedNote"
      class="note"
      :index="index"
      :at-uri="stackedNote"
    />
  </div>
</template>

<style lang="scss">
.public-note-view {
  display: flex;
  flex: 1;

  .back-button {
    position: absolute;
    left: 1.5rem;
    top: 0.5rem;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 1.5rem;
  }

  .badge-author {
    position: absolute;
    top: 0.5rem;
    right: 2rem;
  }

  .article {
    position: sticky;
    padding: 0 2rem;
    scrollbar-width: none;

    article {
      margin-top: 1rem;
    }
  }

  &.content {
    .title,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      color: var(--color-base-content);
    }

    table {
      color: var(--color-base-content);
      background-color: var(--color-base-100);

      thead {
        th {
          color: var(--color-base-content);
        }
      }
    }

    blockquote {
      background-color: var(--color-base-100);
      color: var(--color-base-content);
    }
  }

  .note {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100vh;

    .title {
      text-align: left;
    }
  }

  @media screen and (min-width: 769px) {
    .repo-title-breadcrumb {
      padding: 0.5rem 1rem 0;
      transform-origin: 0 0;
      transform: rotate(90deg);
      font-size: 0.8em;

      a {
        color: var(--color-base-content);
        display: block;
        text-align: center;
      }
    }

    .note {
      min-width: var(--note-width);
      max-width: var(--note-width);
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .repo-title-breadcrumb {
      display: none;
    }

    .article article {
      margin-top: 48px;
    }
  }
}
</style>
