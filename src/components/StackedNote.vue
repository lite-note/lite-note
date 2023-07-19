<script lang="ts" setup>
import { useFile } from '@/hooks/useFile.hook'
import { useImages } from '@/hooks/useImages.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useNoteOverlay } from '@/hooks/useNoteOverlay.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useTitleNotes } from '@/hooks/useTitleNotes.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { filenameToNoteTitle } from '@/utils/noteTitle'
import { generateTweets } from '@/utils/twitter'
import { computed, defineAsyncComponent, nextTick, watch } from 'vue'

const LinkedNotes = defineAsyncComponent(
  () => import('@/components/LinkedNotes.vue')
)

const props = defineProps<{
  user: string
  repo: string
  index: number
  title: string
  sha: string
}>()

const { scrollToFocusedNote } = useQueryStackedNotes()
const { content } = useFile(props.sha)
const className = computed(() => `stacked-note-${props.index}`)
const { listenToClick } = useLinks(className.value, props.sha)
const titleClassName = computed(() => `title-${className.value}`)
useTitleNotes(props.repo)

const store = useUserRepoStore()
const hasBacklinks = computed(() => store.userSettings?.backlink)

const { displayNoteOverlay } = useNoteOverlay(className.value, props.index)
const displayedTitle = computed(() => filenameToNoteTitle(props.title))

watch(content, () => {
  if (!content.value) {
    return
  }

  nextTick(() => {
    listenToClick()
    useImages(props.sha)
    generateTweets()
  })
})

const focus = () => scrollToFocusedNote(props.sha)
</script>

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
      <a @click.prevent="focus">{{ displayedTitle }}</a>
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
    <linked-notes v-if="hasBacklinks && content" :sha="sha" />
  </div>
</template>

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
