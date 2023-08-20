<script lang="ts" setup>
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'

import { useFile } from '@/hooks/useFile.hook'
import { useImages } from '@/hooks/useImages.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useNoteOverlay } from '@/hooks/useNoteOverlay.hook'
import { useRouteQueryStackedNotes } from '@/hooks/useRouteQueryStackedNotes.hook'
import { useTitleNotes } from '@/hooks/useTitleNotes.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { filenameToNoteTitle } from '@/utils/noteTitle'
import { generateTweets } from '@/utils/twitter'

const LinkedNotes = defineAsyncComponent(
  () => import('@/components/LinkedNotes.vue')
)

const EditNote = defineAsyncComponent(
  () => import('@/modules/note/components/EditNote.vue')
)

const props = defineProps<{
  user: string
  repo: string
  index: number
  title: string
  sha: string
}>()

const sha = computed(() => props.sha)
const index = computed(() => props.index)
const repo = computed(() => props.repo)

const { scrollToFocusedNote } = useRouteQueryStackedNotes()

const { content, rawContent } = useFile(sha)
const className = computed(() => `stacked-note-${props.index}`)
const { listenToClick } = useLinks(className.value, sha)
const titleClassName = computed(() => `title-${className.value}`)
useTitleNotes(repo)

const store = useUserRepoStore()
const hasBacklinks = computed(() => store.userSettings?.backlink)

const { displayNoteOverlay } = useNoteOverlay(className.value, index)
const displayedTitle = computed(() => filenameToNoteTitle(props.title))

const mode = ref<'read' | 'edit'>('read')
const toggleMode = () => {
  mode.value = mode.value === 'read' ? 'edit' : 'read'
}

watch([content, mode], () => {
  if (!content.value) {
    return
  }

  nextTick(() => {
    listenToClick()
    useImages(props.sha)
    generateTweets()
  })
})
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
      <a @click.prevent="scrollToFocusedNote(props.sha)"
        >{{ displayedTitle }}
      </a>
    </div>
    <section class="text-content">
      <button
        class="action button is-text"
        :class="{ 'is-link': mode === 'edit' }"
        @click="toggleMode"
      >
        <img src="@/assets/icons/edit.svg" alt="edit" />
      </button>
      <router-link
        v-if="false"
        :to="{
          name: 'ShareNotes',
          params: { user: user, repo: repo, note: sha }
        }"
        class="action"
      >
        <img src="@/assets/icons/share.svg" alt="share" />
      </router-link>
      <div v-if="mode === 'edit'" class="edit">
        <edit-note :sha="sha" :initial-content="rawContent" />
      </div>
      <div v-if="mode === 'read'" class="note-content" v-html="content"></div>
    </section>
    <linked-notes v-if="hasBacklinks && content" :sha="sha" />
  </div>
</template>

<style lang="scss" scoped>
$border-color: rgba(18, 19, 58, 0.2);

.stacked-note {
  padding: 0 1.5rem 1rem;
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

.text-content {
  flex: 1;

  div {
    height: 100%;
  }
}

.action {
  float: right;
  margin: 0.2rem;

  img {
    vertical-align: bottom;
  }
}

@media screen and (max-width: 768px) {
  .stacked-note {
    padding: 0 0.5rem 1rem;

    .title-stacked-note {
      padding: 0.5rem 0 0;
    }

    section {
      padding: 1rem 0 2rem;
      overflow-x: auto;
    }

    .note-content {
      padding: 0 1.5rem;

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
