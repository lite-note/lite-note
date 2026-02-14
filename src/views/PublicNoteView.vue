<script setup lang="ts">
import { useATProtoLinks } from "@/hooks/useATProtoLinks.hook"
import { markdownBuilder } from "@/hooks/useMarkdown.hook"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { getUniqueAka } from "@/modules/atproto/getAka"
import { getUrl } from "@/modules/atproto/getUrl"
import { downloadFont } from "@/utils/downloadFont"
import { computedAsync } from "@vueuse/core"
import { computed, nextTick, watch } from "vue"

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
  theme?: string
  fontFamily?: string
  fontSize?: string
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

const author = computedAsync(async () => getUniqueAka(did.value))
const url = computedAsync(async () =>
  getUrl({ did: did.value, rkey: rkey.value }),
)

const article = computedAsync(async () =>
  url.value ? ((await fetch(url.value).then()).json() as Promise<Root>) : null,
)

watch(article, () => {
  if (article.value?.value.fontFamily) {
    downloadFont(article.value.value.fontFamily)
  }

  console.log("font size:", article.value?.value.fontSize)

  if (article.value?.value.fontSize) {
    const root = document.documentElement
    root.style.setProperty("--font-size", `${article.value.value.fontSize}pt`)
  }
})

const { toHTML } = markdownBuilder()
const withATProtoImages = (markdown: string) => {
  if (!author.value) {
    return markdown
  }

  const endpoint = author.value.endpoint

  const imageLinkPattern = /!\[([^\]]*)\]\((bafkrei[a-z0-9]+)\)/g

  return markdown.replace(imageLinkPattern, (_, altText, cid) => {
    const imageUrl = new URL("/xrpc/com.atproto.sync.getBlob", endpoint)
    imageUrl.searchParams.set("did", did.value)
    imageUrl.searchParams.set("cid", cid)
    return `![${altText}](${imageUrl.toString()})`
  })
}

const title = computed(() => article.value?.value.title)
const content = computed(() =>
  article.value?.value.content
    ? toHTML(withATProtoImages(article.value?.value.content))
    : "",
)

const { listenToClick } = useATProtoLinks("note-display")

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
  <div class="public-note-view repo-note">
    <div class="note article">
      <div class="repo-title-breadcrumb">
        <a
          class="title-stacked-note-link"
          @click.prevent="scrollToFocusedNote()"
          v-if="author && title"
          >{{ title }}</a
        >
      </div>
      <span class="badge badge-accent" v-if="author">{{ author.alias }}</span>
      <article class="note-display" v-html="content"></article>
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
  </div>
</template>

<style lang="scss">
.public-note-view {
  display: flex;
  flex: 1;

  .back-button {
    position: absolute;
    left: 1rem;
    top: 1rem;
    display: flex;
  }

  h1 {
    font-size: 1.5rem;
  }

  .badge {
    margin-bottom: 1rem;
  }

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
