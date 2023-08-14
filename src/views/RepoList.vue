<template>
  <div class="repo-list">
    <h1 class="title is-1">Repositories</h1>
    <go-back />
    <div v-if="!isReady">loading...</div>
    <div v-else class="columns is-centered">
      <div class="column is-one-third">
        <table
          v-if="favoriteRepos.length > 0"
          class="table is-striped is-hoverable"
        >
          <thead>
            <tr>
              <th></th>
              <th>Favorites</th>
            </tr>
          </thead>
          <tbody>
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
                    name: 'FluxNoteView',
                    params: { user: username, repo: repo.name }
                  }"
                  >{{ repo.name }}</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <br v-if="favoriteRepos.length > 0" />
        <table class="table is-striped is-hoverable">
          <thead>
            <tr>
              <th></th>
              <th>Repos</th>
            </tr>
          </thead>
          <tbody>
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
                    name: 'FluxNoteView',
                    params: { user: username, repo: repo.name }
                  }"
                  >{{ repo.name }}</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GoBack from '@/components/GoBack.vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useRepos } from '@/hooks/useRepos.hook'
import { useRepoList } from '@/modules/repo/hooks/useRepoList.hook'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RepoList',
  components: { GoBack },
  setup() {
    const { username } = useGitHubLogin()
    const { isReady } = useRepos()
    const { favoriteRepos, otherRepos, favoriteCheckboxes, toggleCheckbox } =
      useRepoList()

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

  table {
    margin: auto;
  }
}
</style>
