<template>
  <div class="share-notes">
    <article class="message is-primary">
      <div class="message-body">
        You can print this page. It contains every stacked notes.
      </div>
    </article>
    <flux-note
      key="share-notes"
      :user="user"
      :repo="repo"
      :content="content"
      :with-header="false"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue'

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

    return {
      content
    }
  }
})
</script>

<style scoped lang="scss">
.share-notes {
  article {
    margin: 1rem;
  }
}
</style>
