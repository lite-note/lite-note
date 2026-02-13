<script setup lang="ts">
import { markdownBuilder } from "@/hooks/useMarkdown.hook"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { getUniqueAka } from "@/modules/atproto/getAka"
import { getUrl } from "@/modules/atproto/getUrl"
import { computedAsync } from "@vueuse/core"
import { computed } from "vue"

export interface Root {
  uri: string
  cid: string
  value: Value
}

export interface Value {
  $type: string
  title: string
  images: Image[]
  content: string
  createdAt: string
  publishedAt: string
}

export interface Image {
  alt: string
  image: Image2
}

export interface Image2 {
  $type: string
  ref: Ref
  mimeType: string
  size: number
}

export interface Ref {
  $link: string
}

const props = defineProps<{ did: string; rkey: string }>()
const did = computed(() => props.did)
const rkey = computed(() => props.rkey)
const { scrollToFocusedNote } = useRouteQueryStackedNotes()

const alias = computedAsync(async () => getUniqueAka(did.value))
const url = computedAsync(async () =>
  getUrl({ did: did.value, rkey: rkey.value }),
)
const rawContent = computedAsync(async () =>
  url.value ? ((await fetch(url.value).then()).json() as Promise<Root>) : null,
)
const { toHTML } = markdownBuilder()

const title = computed(() => rawContent.value?.value.title)
const content = computed(() =>
  rawContent.value?.value.content
    ? toHTML(rawContent.value?.value.content)
    : "",
)
</script>

<template>
  <div class="public-note-view">
    <div class="note article">
      <div class="repo-title-breadcrumb">
        <a
          class="title-stacked-note-link"
          @click.prevent="scrollToFocusedNote()"
          v-if="alias && title"
          >{{ title }}</a
        >
      </div>
      <span class="badge badge-accent">{{ alias }}</span>
      <article v-html="content"></article>
    </div>
  </div>
</template>

<style lang="scss">
.public-note-view {
  display: flex;
  flex: 1;

  .article {
    position: sticky;
    left: 0;
    top: 0;
    padding: 0 2rem;
    scrollbar-width: none;
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
}
</style>
