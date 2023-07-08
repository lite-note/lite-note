<script setup lang="ts">
import AuthorizeUser from '@/components/AuthorizeUser.vue'
import NewVersion from '@/components/NewVersion.vue'
import { useComputeBacklinks } from '@/hooks/useComputeBacklinks.hook'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'
import { computed, defineAsyncComponent } from 'vue'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const WelcomeWorld = defineAsyncComponent(
  () => import('@/components/WelcomeWorld.vue')
)

const props = defineProps<{ user: string; repo: string }>()

useQueryStackedNotes()
useComputeBacklinks()
const routeKey = computed(() => `${props.user}-${props.repo}`)
</script>

<template>
  <div v-if="!user || !repo" class="home content">
    <authorize-user class="authorize" />
    <welcome-world />
  </div>
  <flux-note v-else :key="routeKey" :user="user" :repo="repo" />
  <new-version class="new-version" />
</template>

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
