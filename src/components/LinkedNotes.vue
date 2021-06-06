<template>
  <div v-if="(backlink?.links.length ?? 0) > 0" class="linked-notes">
    <hr />
    <h4 class="subtitle is-4">🔗 Links to this note</h4>
    <ul>
      <li v-for="link in backlink?.links" :key="link.sha">
        <a @click.prevent="emitNote(link.sha)">
          {{ link.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useBacklinks } from '@/hooks/useBacklinks.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LinkedNotes',
  props: {
    sha: { type: String, required: true }
  },
  setup(props) {
    const { backlink } = useBacklinks(props.sha)
    const { addStackedNote } = useQueryStackedNotes()

    const emitNote = (sha: string) => {
      addStackedNote(props.sha, sha)
    }

    return {
      backlink: backlink.state,
      emitNote
    }
  }
})
</script>

<style scoped lang="scss">
.linked-notes {
  .subtitle {
    font-style: italic;
  }
}
</style>
