<template>
  <main class="flux-note content note-container" v-if="!isLoading">
    <div class="note readme">
      <header-note class="header" :user="user" :repo="repo" />
      <div class="repo-title-breadcrumb">
        <a @click.prevent="focus">{{ repo }}</a>
      </div>
      <div class="repo-title">
        <h1 class="title is-1">
          [<router-link
            :to="{ name: 'Home', params: { user, repo } }"
            @click="resetStackedNotes"
            >{{ repo }}</router-link
          >]
        </h1>
        <h4 class="subtitle is-4">
          <em>{{ user }}</em>
        </h4>
      </div>
      <slot />
      <div v-if="!hasContent">
        No content here 📝
      </div>
      <p class="note-display" v-html="renderedContent"></p>
    </div>
    <stacked-note
      class="note"
      v-for="(stackedNote, index) in stackedNotes"
      :key="stackedNote"
      :index="index"
      :sha="stackedNote"
      :title="titles[stackedNote ?? '']"
    />
  </main>
</template>

<script lang="ts">
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import {
  defineComponent,
  defineAsyncComponent,
  computed,
  watch,
  nextTick,
  toRefs,
  onUnmounted
} from 'vue'
import HeaderNote from '@/components/HeaderNote.vue'
import { useNote } from '@/hooks/useNote.hook'
import { useMarkdown } from '@/hooks/useMarkdown.hook'
import { useLinks } from '@/hooks/useLinks.hook'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { useUserSettings } from '@/modules/user/hooks/useUserSettings.hook'
import { useFocus } from '@/hooks/useFocus.hook'

const StackedNote = defineAsyncComponent(() =>
  import('@/components/StackedNote.vue')
)

export default defineComponent({
  name: 'FluxNote',
  components: {
    HeaderNote,
    StackedNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true },
    content: { type: String, required: false, default: null }
  },
  setup(props) {
    const refProps = toRefs(props)
    const store = useUserRepoStore()
    useUserSettings()
    const { renderString } = useMarkdown()
    const { listenToClick } = useLinks('note-display')
    const { stackedNotes, resetStackedNotes } = useQueryStackedNotes()
    const { scrollToFocusedNote } = useFocus()

    const { ...noteProps } = useNote('note-container')

    const renderedContent = computed(() =>
      props.content !== null ? renderString(props.content) : store.readme
    )

    const hasContent = computed(() => !!renderedContent.value)
    const isLoading = computed(() => renderedContent.value === undefined)

    watch(
      renderedContent,
      () =>
        nextTick(() => {
          listenToClick()
        }),
      { immediate: true }
    )

    watch(
      [refProps.user, refProps.repo],
      () => {
        store.setUserRepo(props.user, props.repo)
      },
      { immediate: true }
    )

    onUnmounted(() => {
      store.resetFiles()
      resetStackedNotes()
    })

    return {
      hasContent,
      isLoading,
      renderedContent,
      stackedNotes,
      resetStackedNotes,
      userSettings: computed(() => store.userSettings),
      focus: () => scrollToFocusedNote(undefined, true),
      ...noteProps
    }
  }
})
</script>

<style lang="scss">
$header-height: 40px;

.flux-note {
  font-family: var(--font-family);
  color: var(--font-color);
  background-color: var(--background-color);
  transition-property: color, background-color;
  transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s;

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
      text-align: center;
    }
  }

  .note-display {
    padding-bottom: 2rem;
  }

  .note {
    text-align: left;
    overflow-y: auto;
    height: 100vh;
    position: sticky;

    &:not(:first-child) {
      border-top: 1px solid rgba(18, 19, 58, 0.2);
    }
  }

  @media screen and (min-width: 769px) {
    .repo-title-breadcrumb {
      padding: 0 1rem;
      transform-origin: 0 0;
      transform: rotate(90deg);

      a {
        color: var(--font-color);
        display: block;
        text-align: center;
      }
    }

    .note {
      min-width: 620px;
      max-width: 620px;
    }
  }
}

@media screen and (max-width: 768px) {
  .flux-note {
    flex-wrap: wrap;

    .note {
      width: 100vw;
    }
  }

  .repo-title-breadcrumb {
    display: none;
    visibility: hidden;
  }
}
</style>
