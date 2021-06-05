<template>
  <div
    class="stacked-note"
    :class="{
      [className]: true,
      overlay: displayNoteOverlay,
      [`note-${sha}`]: true
    }"
  >
    <div class="title-stacked-note" :class="titleClassName">
      <a @click.prevent="focus">
        {{ displayedTitle }}
      </a>
    </div>
    <div v-if="false" class="share">
      <router-link
        :to="{
          name: 'ShareNotes',
          params: { user: user, repo: repo, note: sha }
        }"
      >
        <img src="@/assets/icons/share.svg" alt="share" />
      </router-link>
    </div>
    <section class="note-content" v-html="content"></section>
    <linked-notes v-if="content" :sha="sha" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, watch } from 'vue'
import { useFile } from '@/hooks/useFile.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useNoteOverlay } from '@/hooks/useNoteOverlay.hook'
import { useFocus } from '@/hooks/useFocus.hook'
import { useImages } from '@/hooks/useImages.hook'
import LinkedNotes from '@/components/LinkedNotes.vue'

export default defineComponent({
  name: 'StackedNote',
  components: {
    LinkedNotes
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true },
    index: { type: Number, required: true },
    title: { type: String, required: true },
    sha: { type: String, required: true }
  },
  setup(props) {
    const { scrollToFocusedNote } = useFocus()
    const { content, fromCache } = useFile(props.sha)
    const { listenToClick } = useLinks('stacked-note', props.sha)
    const className = computed(() => `stacked-note-${props.index}`)
    const titleClassName = computed(() => `title-${className.value}`)

    const { displayNoteOverlay } = useNoteOverlay(className.value, props.index)
    const displayedTitle = computed(() => props.title.replaceAll('/', ' / '))

    watch(content, () => {
      if (content.value) {
        nextTick(() => {
          listenToClick()
          useImages(props.sha)
        })
      }
    })

    return {
      content,
      fromCache,
      titleClassName,
      className,
      displayNoteOverlay,
      displayedTitle,
      focus: () => scrollToFocusedNote(props.sha)
    }
  }
})
</script>

<style lang="scss" scoped>
$border-color: rgba(18, 19, 58, 0.2);

.stacked-note {
  padding: 1rem 1.5rem;
  background-color: var(--background-color);

  transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;

  &.overlay {
    box-shadow: -3px 0 0.4em $border-color;
  }

  section {
    padding: 0 1rem 2rem;
  }
}

.offline-ready {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.title-stacked-note {
  background-color: var(--background-color);
  position: sticky;

  top: 0;
  font-size: 0.8em;

  a {
    color: var(--font-color);
    display: block;
  }
}

.share {
  float: right;
  margin: 0.2rem;

  img {
    vertical-align: bottom;
  }
}

@media screen and (max-width: 768px) {
  .stacked-note {
    padding: 0 1.5rem;

    .title-stacked-note {
      padding: 0.5rem 0 0;
    }

    section {
      padding: 1rem 0 2rem;
      overflow-x: auto;
    }

    .note-content {
      .table {
        overflow-x: auto;
      }
    }
  }
}

@media screen and (min-width: 769px) {
  .stacked-note {
    border-top: 0;
    border-left: 1px solid $border-color;
  }

  .title-stacked-note {
    padding: 0 1rem;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }

  a {
    white-space: nowrap;
  }
}

@media print {
  .stacked-note {
    break-after: always;

    &.overlay {
      box-shadow: none;
    }
  }
}
</style>
