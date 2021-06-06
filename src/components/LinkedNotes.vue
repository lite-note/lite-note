<template>
  <div v-if="hasBacklinks" class="linked-notes">
    <h5 class="subtitle is-5">🔗</h5>
    <ul class="links">
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
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'LinkedNotes',
  props: {
    sha: { type: String, required: true }
  },
  setup(props) {
    const { backlink } = useBacklinks(props.sha)
    const { addStackedNote } = useQueryStackedNotes()
    const hasBacklinks = computed(
      () => (backlink.state.value?.links.length ?? 0) > 0
    )

    const emitNote = (sha: string) => {
      addStackedNote(props.sha, sha)
    }

    return {
      backlink: backlink.state,
      hasBacklinks,
      emitNote
    }
  }
})
</script>

<style scoped lang="scss">
.linked-notes {
  padding: 1rem;
  background-color: var(--light-link);

  .subtitle {
    font-style: italic;
    padding-top: 1rem;
    text-align: center;
  }

  ul {
    list-style-type: square;
  }
}
</style>
