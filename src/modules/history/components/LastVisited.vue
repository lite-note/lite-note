<template>
  <ul v-if="lastVisitedRepos.length" class="last-visited">
    <li
      v-for="lastVisitedRepo in lastVisitedRepos"
      :key="`${lastVisitedRepo.user}-${lastVisitedRepo.repo}`"
    >
      <router-link
        :to="{
          name: `Home`,
          params: { user: lastVisitedRepo.user, repo: lastVisitedRepo.repo }
        }"
        >{{ lastVisitedRepo.user }}/{{ lastVisitedRepo.repo }}</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { useLastVisitedRepos } from '@/modules/history/hooks/useLastVisitedRepos.hook'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LastVisited',
  setup() {
    const { lastVisitedRepos } = useLastVisitedRepos()

    return {
      lastVisitedRepos
    }
  }
})
</script>

<style scoped lang="scss">
.last-visited {
}
</style>
