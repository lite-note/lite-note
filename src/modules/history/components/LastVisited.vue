<template>
  <section v-if="lastVisitedRepos.length" class="last-visited">
    <h4>Last visited repos</h4>
    <ul>
      <li
        v-for="lastVisitedRepo in lastVisitedRepos"
        :key="`${lastVisitedRepo.user}-${lastVisitedRepo.repo}`"
      >
        <div>
          <router-link
            :to="{
              name: `FluxNoteView`,
              params: {
                user: lastVisitedRepo.user,
                repo: lastVisitedRepo.repo
              }
            }"
            >{{ lastVisitedRepo.user }}/{{ lastVisitedRepo.repo }}</router-link
          >
        </div>
      </li>
    </ul>
  </section>
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
  li {
    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
