<template>
  <div class="fleeting-notes">
    <flux-note
      :user="user"
      :repo="repo"
      :content="content"
      key="fleeting-notes"
    >
      <h3 class="subtitle is-3">
        Inbox
      </h3>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'
import { defineAsyncComponent, defineComponent } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const FLEETING_NOTES_FOLDER = ['inbox', '_inbox']

export default defineComponent({
  name: 'FleetingNotes',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup() {
    const { content } = useFolderNotes(FLEETING_NOTES_FOLDER)

    return {
      content
    }
  }
})
</script>

<style scoped lang="scss">
.fleeting-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }
}
</style>
