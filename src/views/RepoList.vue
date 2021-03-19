<template>
  <div class="repo-list">
    <go-back />
    <h1 class="title is-1">Repositories</h1>
    <span v-if="!isReady">loading...</span>
    <div v-else class="columns is-centered">
      <div class="column is-one-third">
        <table class="table is-striped is-hoverable is-fullwidth">
          <tr v-for="repo in favoriteRepos" :key="repo.id">
            <td>
              <input
                type="checkbox"
                name="favorites"
                :value="repo.id"
                :checked="favoriteCheckboxes.includes(repo.id)"
                @click="toggleCheckbox(repo)"
              />
            </td>
            <td>
              <span v-if="repo.isPrivate">🔏</span>

              <router-link
                :to="{
                  name: 'Home',
                  params: { user: username, repo: repo.name }
                }"
              >
                {{ repo.name }}
              </router-link>
            </td>
          </tr>
          <tr v-for="repo in otherRepos" :key="repo.id">
            <td>
              <input
                type="checkbox"
                name="favorites"
                :value="repo.id"
                :checked="favoriteCheckboxes.includes(repo.id)"
                @click="toggleCheckbox(repo)"
              />
            </td>
            <td>
              <router-link
                :to="{
                  name: 'Home',
                  params: { user: username, repo: repo.name }
                }"
              >
                {{ repo.name }}
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useRepoList } from '@/modules/repo/hooks/userRepoList.hook'
import { useRepos } from '@/hooks/useRepos.hook'
import GoBack from '@/components/GoBack.vue'

export default defineComponent({
  name: 'RepoList',
  components: { GoBack },
  setup() {
    const { username } = useGitHubLogin()
    const { isReady } = useRepos()
    const {
      favoriteRepos,
      otherRepos,
      favoriteCheckboxes,
      toggleCheckbox
    } = useRepoList()

    return {
      isReady,
      username,
      favoriteRepos,
      otherRepos,
      favoriteCheckboxes,
      toggleCheckbox
    }
  }
})
</script>

<style lang="scss" scoped>
.repo-list {
  flex: 1;
  padding: 1rem;
  text-align: center;

  overflow-y: auto;
}
</style>
