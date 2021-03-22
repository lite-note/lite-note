<template>
  <div class="fleeting-notes">
    <flux-note
      :user="user"
      :repo="repo"
      :content="content"
      key="fleeting-notes"
    >
      <h3 class="subtitle is-3">
        Fleeting notes
      </h3>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'
import { defineAsyncComponent, defineComponent, onMounted, toRefs } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const FLEETING_NOTES_FOLDER = 'fleeting-notes'

export default defineComponent({
  name: 'FleetingNotes',
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
      FLEETING_NOTES_FOLDER,
      refProps.user,
      refProps.repo
    )
    const { resetStackedNotes } = useQueryStackedNotes()

    onMounted(() => {
      resetStackedNotes()
    })

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
