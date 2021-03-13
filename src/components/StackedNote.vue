<template>
  <div class="stacked-note" v-html="content"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from 'vue'
import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'

export default defineComponent({
  name: 'StackedNote',
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true },
    sha: { type: String, required: true }
  },
  setup(props) {
    const { content } = useFile(props.user, props.repo, props.sha)
    const { listenToClick } = useLinks('stacked-note', props.sha)

    watch(content, () => {
      if (content.value) {
        nextTick(() => {
          listenToClick()
        })
      }
    })

    return { content }
  }
})
</script>

<style lang="scss" scoped>
.stacked-note {
  text-align: left;
  border-top: 1px solid rgba(18, 19, 58, 0.2);
  padding: 0 1rem;
}

@media screen and (min-width: 769px) {
  .stacked-note {
    border-top: 0;
    border-left: 1px solid rgba(18, 19, 58, 0.2);
  }
}
</style>
