<script lang="ts" setup>
import { useFile } from '@/hooks/useFile.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { computed, defineAsyncComponent, onMounted } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const props = defineProps<{ user: string; repo: string; note: string }>()

const { resetStackedNotes } = useQueryStackedNotes()
const note = computed(() => props.note)
const { content } = useFile(note)

onMounted(() => {
  resetStackedNotes()
})
</script>

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
      :parse-content="false"
    />
  </div>
</template>

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
