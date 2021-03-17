<template>
  <div class="repo-list">
    <h1>Repositories</h1>
    <span v-if="!isReady">loading...</span>
    <ul>
      <li v-for="repo in repos" :key="repo">
        <router-link
          :to="{ name: 'Home', params: { user: username, repo: repo } }"
        >
          {{ repo }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRepos } from '@/hooks/useRepos.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

export default defineComponent({
  name: 'RepoList',
  setup() {
    const { username } = useGitHubLogin()

    return {
      ...useRepos(),
      username
    }
  }
})
</script>

<style lang="scss" scoped>
.repo-list {
  flex: 1;
  text-align: center;
}
</style>
