<template>
  <div class="share-notes">
    <article class="message is-primary">
      <div class="message-body">
        You can print this page. It contains every stacked notes.
      </div>
    </article>
    <flux-note
      key="share-notes"
      class="notes"
      :user="user"
      :repo="repo"
      :content="content"
      :with-header="false"
    />
  </div>
</template>

<script lang="ts">
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

export default defineComponent({
  name: 'ShareNotes',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true },
    note: { type: String, required: true }
  },
  setup() {
    const content = ref('Getting stacked notes...')
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
.share-notes {
  background-color: var(--background-color);
  min-width: 100vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  article {
    margin: 1rem;
  }
}

@media print {
  article {
    display: none;
  }
}
</style>
