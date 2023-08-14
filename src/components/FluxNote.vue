<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  nextTick,
  onMounted,
  onUnmounted,
  toRefs,
  watch
} from 'vue'

import LiteLoading from '@/components/LiteLoading.vue'
import { useLinks } from '@/hooks/useLinks.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useNote } from '@/hooks/useNote.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { useVisitRepo } from '@/modules/history/hooks/useVisitRepo.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { useUserSettings } from '@/modules/user/hooks/useUserSettings.hook'

const HeaderNote = defineAsyncComponent(
  () => import('@/components/HeaderNote.vue')
)

const StackedNote = defineAsyncComponent(
  () => import('@/components/StackedNote.vue')
)

const props = withDefaults(
  defineProps<{
    user: string
    repo: string
    content?: string | null
    parseContent?: boolean
    withContent?: boolean
    withHeader?: boolean
  }>(),
  {
    content: null,
    parseContent: true,
    withContent: true,
    withHeader: true
  }
)

const user = computed(() => props.user)
const repo = computed(() => props.repo)

const refProps = toRefs(props)
const store = useUserRepoStore()
useUserSettings()
const { visitRepo } = useVisitRepo({ user: user, repo: repo })
const { toHTML } = useMarkdown(repo)
const { listenToClick } = useLinks('note-display')
const { stackedNotes, resetStackedNotes } = useQueryStackedNotes()
const { scrollToFocusedNote } = useQueryStackedNotes()

const { titles } = useNote('note-container')

const renderedContent = computed(() =>
  props.content !== null
    ? props.parseContent
      ? toHTML(props.content)
      : props.content
    : store.readme
)

const hasContent = computed(() => !!renderedContent.value)
const isLoading = computed(() => renderedContent.value === undefined)

watch(
  renderedContent,
  async () => {
    await nextTick()
    listenToClick()
  },
  { immediate: true }
)

watch(
  [refProps.user, refProps.repo],
  () => {
    store.setUserRepo(props.user, props.repo)
  },
  { immediate: true }
)

onMounted(() => visitRepo())

onUnmounted(() => {
  store.resetFiles()
  resetStackedNotes()
})

const focus = () => scrollToFocusedNote(undefined, true)
</script>

<template>
  <main class="flux-note repo-note content note-container">
    <div class="note readme">
      <header-note v-if="withHeader" class="header" :user="user" :repo="repo" />
      <div class="repo-title-breadcrumb">
        <a @click.prevent="focus">{{ repo }}</a>
      </div>
      <div class="repo-title">
        <h1 class="title is-1">
          [<router-link
            :to="{ name: 'FluxNoteView', params: { user, repo } }"
            @click="resetStackedNotes"
          >
            {{ repo }} </router-link
          >]
        </h1>
        <h4 class="subtitle is-4">
          <em>{{ user }}</em> -
          <img
            v-show="store.isReadmeOffline"
            src="@/assets/icons/offline.svg"
            alt="ofline"
          />
          <img
            v-show="!store.isReadmeOffline"
            src="@/assets/icons/online.svg"
            alt="ofline"
          />
        </h4>
      </div>
      <slot />
      <lite-loading v-if="isLoading" />
      <div v-else-if="!hasContent">No content here 📝</div>
      <p
        v-else-if="withContent"
        class="note-display"
        v-html="renderedContent"
      />
    </div>
    <stacked-note
      v-for="(stackedNote, index) in stackedNotes"
      :key="stackedNote"
      class="note"
      :index="index"
      :sha="stackedNote"
      :user="user"
      :repo="repo"
      :title="titles[stackedNote ?? '']"
    />
  </main>
</template>

<style lang="scss">
$header-height: 40px;

.flux-note {
  display: flex;
  flex: 1;

  &.content {
    .title,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      color: var(--font-color);
    }

    table {
      color: var(--font-color);
      background-color: var(--background-color);

      thead {
        th {
          color: var(--font-color);
        }
      }
    }

    blockquote {
      background-color: var(--background-color);
    }
  }

  .header {
    height: $header-height;
  }

  .readme {
    position: sticky;
    left: 0;
    top: 0;
    padding: 0 2rem 1rem;

    .repo-title {
      margin-top: 1rem;

      .title,
      .subtitle {
        text-align: center;
      }

      img {
        vertical-align: middle;
      }
    }
  }

  .note-display {
    padding-bottom: 2rem;
  }

  .note {
    display: flex;
    flex-direction: column;
    text-align: justify;
    overflow-y: auto;
    height: 100vh;
    position: sticky;

    &:not(:first-child) {
      border-top: 1px solid rgba(18, 19, 58, 0.2);
    }

    .title {
      text-align: left;
    }
  }

  @media screen and (min-width: 769px) {
    .repo-title-breadcrumb {
      padding: 0.5rem 1rem 0;
      transform-origin: 0 0;
      transform: rotate(90deg);
      font-size: 0.8em;

      a {
        color: var(--font-color);
        display: block;
        text-align: center;
      }
    }

    .note {
      min-width: var(--note-width);
      max-width: var(--note-width);
    }
  }
}

@media print, screen and (max-width: 768px) {
  .flux-note {
    flex-wrap: wrap;
  }

  .note {
    width: 100vw;
    overflow-y: visible;
  }

  .repo-title-breadcrumb {
    display: none;
    visibility: hidden;
  }
}
</style>
