<template>
  <div class="flux-note content note-container">
    <div class="note readme">
      <header-note class="header" />
      <slot>
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
        <p class="note-display" v-html="readme"></p>
      </slot>
    </div>
    <stacked-note
      class="note"
      v-for="(stackedNote, index) in stackedNotes"
      :key="stackedNote"
      :index="index"
      :user="user"
      :repo="repo"
      :sha="stackedNote"
      :title="titles[stackedNote ?? '']"
    />
  </div>
</template>

<script lang="ts">
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { defineComponent, defineAsyncComponent, toRefs } from 'vue'
import HeaderNote from '@/components/HeaderNote.vue'
import { useNote } from '@/hooks/useNote.hook'

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
    user: { type: String, required: false, default: '' },
    repo: { type: String, required: false, default: '' }
  },
  setup(props) {
    const refProps = toRefs(props)
    const { stackedNotes, resetStackedNotes } = useQueryStackedNotes()

    return {
      stackedNotes,
      resetStackedNotes,
      ...useNote('note-container', refProps.user, refProps.repo)
    }
  }
})
</script>

<style scoped lang="scss">
$header-height: 40px;

.flux-note {
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

  .note {
    text-align: left;
    overflow-y: auto;
    height: 100vh;
    position: sticky;
    background-color: #fff;

    &:not(:first-child) {
      border-top: 1px solid rgba(18, 19, 58, 0.2);
    }
  }

  @media screen and (min-width: 769px) {
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
      width: 100%;
    }
  }
}
</style>
