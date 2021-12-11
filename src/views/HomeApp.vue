<template>
  <div v-if="!user || !repo" class="home content">
    <authorize-user class="authorize" />
    <new-version class="new-version" />
    <welcome-world />
  </div>
  <flux-note v-else :key="routeKey" :user="user" :repo="repo" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import NewVersion from '@/components/NewVersion.vue'
import AuthorizeUser from '@/components/AuthorizeUser.vue'
import { useComputeBacklinks } from '@/hooks/useComputeBacklinks.hook'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const WelcomeWorld = defineAsyncComponent(
  () => import('@/components/WelcomeWorld.vue')
)

export default defineComponent({
  name: 'HomeApp',
  components: {
    WelcomeWorld,
    FluxNote,
    NewVersion,
    AuthorizeUser
  },
  props: {
    user: { type: String, required: false, default: '' },
    repo: { type: String, required: false, default: '' }
  },
  setup(props) {
    const { resetStackedNotes } = useQueryStackedNotes()
    useComputeBacklinks()

    return {
      resetStackedNotes,
      routeKey: computed(() => `${props.user}-${props.repo}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .new-version {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

.authorize {
  margin: auto;
}
</style>
