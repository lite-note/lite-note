<template>
  <div class="draft-notes">
    <flux-note key="draft-notes" :user="user" :repo="repo" :content="content">
      <h3 class="subtitle is-3">Drafts</h3>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const DRAFT_FOLDER = ['drafts', '_drafts']

export default defineComponent({
  name: 'DraftNotes',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup() {
    const { content } = useFolderNotes(DRAFT_FOLDER)

    return {
      content
    }
  }
})
</script>

<style scoped lang="scss">
.draft-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }
}
</style>
