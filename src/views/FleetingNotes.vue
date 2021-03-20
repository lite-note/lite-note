<template>
  <div class="fleeting-notes">
    <flux-note :user="user" :repo="repo" :content="content">
      <h3 class="subtitle is-3">
        Fleeting notes
      </h3>
    </flux-note>
  </div>
</template>

<script lang="ts">
import { useFleetingNotes } from '@/modules/note/hooks/useFleetingNotes'
import { defineAsyncComponent, defineComponent, toRefs } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

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
    const { content } = useFleetingNotes(refProps.user, refProps.repo)

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
