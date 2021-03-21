<template>
  <div class="draft-notes">
    <flux-note :user="user" :repo="repo" :content="content">
      <h3 class="subtitle is-3">
        Drafts
      </h3>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'
import { defineAsyncComponent, defineComponent, toRefs } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const DRAFT_FOLDER = 'drafts'

export default defineComponent({
  name: 'DraftNotes',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup(props) {
    const refProps = toRefs(props)
    const { content } = useFolderNotes(
      DRAFT_FOLDER,
      refProps.user,
      refProps.repo
    )

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
