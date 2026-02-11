<script setup lang="ts">
import { markdownBuilder } from "@/hooks/useMarkdown.hook"
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

const alias = computedAsync(async () => getUniqueAka(did.value))
const url = computedAsync(async () =>
  getUrl({ did: did.value, rkey: rkey.value }),
)
const rawContent = computedAsync(async () =>
  url.value ? ((await fetch(url.value).then()).json() as Promise<Root>) : null,
)
const { toHTML } = markdownBuilder()

// const title = computed(() => rawContent.value?.value.title)
const content = computed(() =>
  rawContent.value?.value.content
    ? toHTML(rawContent.value?.value.content)
    : "",
)
</script>

<template>
  <div class="public-note-view">
    <span v-if="alias">{{ alias }}</span>
    <div v-html="content"></div>
  </div>
</template>

<style scoped lang="scss">
.public-note-view {
}
</style>
