<template>
  <div class="home content" v-if="!user || !repo">
    <welcome-world />
  </div>
  <div v-else-if="notFound">
    <hr />
    <div class="columns is-centered">
      <div class="column is-one-third notification is-warning" v-if="notFound">
        Not found.
      </div>
    </div>
  </div>
  <div class="home content note-container" v-else>
    <div class="readme note">
      <h1 class="title is-1">
        [<router-link
          :to="{ name: 'Home', params: { user, repo } }"
          :key="routeKey"
        >
          {{ repo }} </router-link
        >]
      </h1>
      <h2 class="subtitle is-2">
        <em>{{ user }}</em>
      </h2>
      <p class="note-display" v-html="readme"></p>
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
import { defineComponent, defineAsyncComponent, computed, toRefs } from 'vue'
import { useNote } from '@/hooks/useNote.hook'

const StackedNote = defineAsyncComponent(() =>
  import('@/components/StackedNote.vue')
)

const WelcomeWorld = defineAsyncComponent(() =>
  import('@/components/WelcomeWorld.vue')
)

export default defineComponent({
  name: 'Home',
  components: {
    StackedNote,
    WelcomeWorld
  },
  props: {
    user: { type: String, required: false, default: '' },
    repo: { type: String, required: false, default: '' }
  },
  setup(props) {
    const refProps = toRefs(props)

    return {
      ...useNote('note-container', refProps.user, refProps.repo),
      routeKey: computed(() => `${props.user}-${props.repo}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;

  .readme {
    position: sticky;
    left: 0;
    padding: 0 2rem 1rem;
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
  .home {
    flex-wrap: wrap;

    .note {
      position: initial;
      width: 100vw;
      height: auto;
    }
  }
}
</style>
