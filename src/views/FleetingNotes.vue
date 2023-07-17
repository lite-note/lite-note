<script lang="ts" setup>
import FluxNote from '@/components/FluxNote.vue'
import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'

const FLEETING_NOTES_FOLDER = ['inbox', '_inbox']

defineProps<{ user: string; repo: string }>()
const { content } = useFolderNotes(FLEETING_NOTES_FOLDER)
</script>

<template>
  <div class="fleeting-notes">
    <flux-note
      key="fleeting-notes"
      :user="user"
      :repo="repo"
      :content="content"
    >
      <h3 class="subtitle is-3">Inbox</h3>
    </flux-note>
  </div>
</template>

<style scoped lang="scss">
.fleeting-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }
}
</style>
