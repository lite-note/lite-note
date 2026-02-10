<script setup lang="ts">
import { getUrl } from "@/modules/atproto/getUrl"
import { computedAsync } from "@vueuse/core"
import { computed } from "vue"

const props = defineProps<{ did: string; rkey: string }>()
const did = computed(() => props.did)
const rkey = computed(() => props.rkey)

const url = computedAsync(async () =>
  getUrl({ did: did.value, rkey: rkey.value }),
)
const content = computedAsync(async () =>
  url.value ? (await fetch(url.value).then()).json() : null,
)
</script>

<template>
  <div class="public-note-view">
    {{ did }}/{{ rkey }}@{{ url }}
    <pre>{{ content }}</pre>
  </div>
</template>

<style scoped lang="scss">
.public-note-view {
}
</style>
