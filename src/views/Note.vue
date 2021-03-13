<template>
  <div class="note content">
    <hr v-if="notFound" />
    <div v-if="notFound" class="columns is-centered">
      <div class="column is-one-third notification is-warning" v-if="notFound">
        Not found.
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h1 class="title is-1">
          <router-link :to="{ name: 'Note' }">
            {{ repo }}
          </router-link>
        </h1>
        <h2 class="subtitle is-2">{{ user }}</h2>
        <p class="note-display" v-html="readme"></p>
      </div>
      <div
        class="column"
        v-for="stackedNote in stackedNotes"
        :key="stackedNote"
      >
        <stacked-note :user="user" :repo="repo" :sha="stackedNote" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useNote } from '@/hooks/useNote.hook'

const StackedNote = defineAsyncComponent(() =>
  import('@/components/StackedNote.vue')
)

export default defineComponent({
  name: 'Home',
  components: {
    StackedNote
  },
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  },
  setup(props) {
    return useNote(props.user, props.repo)
  }
})
</script>
