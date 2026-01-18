<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue"

import { useFolderNotes } from "@/modules/note/hooks/useFolderNotes"

const FluxNote = defineAsyncComponent(() => import("@/components/FluxNote.vue"))
const props = defineProps<{ user: string; repo: string }>()
const user = computed(() => props.user)
const repo = computed(() => props.repo)

const DRAFT_FOLDER = ["drafts", "_drafts"]
const { content } = useFolderNotes(DRAFT_FOLDER)
</script>

<template>
  <div class="draft-notes">
    <flux-note key="draft-notes" :user="user" :repo="repo" :content="content">
      <h3 class="subtitle is-3">Drafts</h3>
    </flux-note>
  </div>
</template>

<style scoped lang="scss">
.draft-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }
}
</style>
