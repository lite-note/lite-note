<template>
  <div class="historic-notes">
    <flux-note
      key="historic-notes"
      :user="user"
      :repo="repo"
      :with-content="false"
    >
      <h3 class="subtitle is-3">History</h3>
      {{ notes }}
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useNotes } from '@/modules/note/hooks/useNotes'
import { defineAsyncComponent, defineComponent } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

export default defineComponent({
  name: 'HistoricNotes',
  components: {
    FluxNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup() {
    const notes = useNotes()

    return { notes }
  }
})
</script>

<style scoped lang="scss">
.historic-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }
}
</style>
