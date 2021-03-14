<template>
  <div v-if="!user || !repo" :key="routeKey">
    Bonjour

    <form @submit.prevent>
      <div class="columns is-mobile is-centered is-vcentered">
        <div class="column">
          <div class="field">
            <label class="label">user</label>
            <div class="control">
              <input class="input" type="text" v-model="userInput" />
            </div>
          </div>
        </div>
        <div class="column">/</div>
        <div class="column">
          <div class="field">
            <label class="label">repo</label>
            <div class="control">
              <input class="input" type="text" v-model="repoInput" />
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="button is-primary" @click="submit">
        y aller
      </button>
    </form>
  </div>
  <div class="home content" v-else>
    <hr v-if="notFound" />
    <div v-if="notFound" class="columns is-centered">
      <div class="column is-one-third notification is-warning" v-if="notFound">
        Not found.
      </div>
    </div>
    <div class="note-container">
      <div class="readme">
        <h1 class="title is-1">
          <router-link
            :to="{ name: 'Home', params: { user, repo } }"
            :key="routeKey"
          >
            {{ repo }}
          </router-link>
        </h1>
        <h2 class="subtitle is-2">{{ user }}</h2>
        <p class="note-display" v-html="readme"></p>
      </div>
      <stacked-note
        class="note"
        v-for="stackedNote in stackedNotes"
        :key="stackedNote"
        :user="user"
        :repo="repo"
        :sha="stackedNote"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, toRefs } from 'vue'
import { useNote } from '@/hooks/useNote.hook'
import { useForm } from '@/hooks/useForm.hook'

const StackedNote = defineAsyncComponent(() =>
  import('@/components/StackedNote.vue')
)

export default defineComponent({
  name: 'Home',
  components: {
    StackedNote
  },
  props: {
    user: { type: String, required: false, default: '' },
    repo: { type: String, required: false, default: '' }
  },
  setup(props) {
    const refProps = toRefs(props)
    return {
      ...useNote(refProps.user, refProps.repo),
      ...useForm(),
      routeKey: computed(() => `${props.user}-${props.repo}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 769px) {
    .readme,
    .note {
      min-width: 620px;
      max-width: 720px;
    }
  }

  .note-container {
    flex: 1;
    display: flex;
    overflow-x: auto;
  }
}
</style>
