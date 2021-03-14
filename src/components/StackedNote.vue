<template>
  <div
    class="stacked-note"
    :class="{ [className]: true, overlay: displayNoteOverlay }"
  >
    <div class="title-stacked-note" :class="titleClassName">
      <a @click.prevent="focus">
        {{ title }}
      </a>
    </div>
    <section v-html="content"></section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, watch } from 'vue'
import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useNoteOverlay } from '@/hooks/useNoteOverlay.hook'
import { useFocus } from '@/hooks/useFocus.hook'

export default defineComponent({
  name: 'StackedNote',
  props: {
    index: { type: Number, required: true },
    user: { type: String, required: true },
    repo: { type: String, required: true },
    title: { type: String, required: true },
    sha: { type: String, required: true }
  },
  setup(props) {
    const { content } = useFile(props.user, props.repo, props.sha)
    const { listenToClick } = useLinks('stacked-note', props.sha)
    const { scrollToFocusedNote } = useFocus()
    const className = computed(() => `stacked-note-${props.index}`)
    const titleClassName = computed(() => `title-${className.value}`)

    const { displayNoteOverlay } = useNoteOverlay(className.value, props.index)

    watch(content, () => {
      if (content.value) {
        nextTick(() => {
          listenToClick()
        })
      }
    })

    return {
      content,
      titleClassName,
      className,
      displayNoteOverlay,
      focus: () => scrollToFocusedNote(props.sha)
    }
  }
})
</script>

<style lang="scss" scoped>
$border-color: rgba(18, 19, 58, 0.2);

.stacked-note {
  padding: 1rem 3rem;

  transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;

  &.overlay {
    box-shadow: -3px 0 0.4em $border-color;
  }
}

.title-stacked-note {
  position: absolute;
  transform-origin: 0 0;
  transform: rotate(90deg);
  top: 1rem;
  left: 1.5rem;
  direction: rtl;

  a {
    color: #363636;
  }
}

@media screen and (max-width: 768px) {
  .title-stacked-note {
    display: none;
  }
}

@media screen and (min-width: 769px) {
  .stacked-note {
    border-top: 0;
    border-left: 1px solid $border-color;
  }
}
</style>
