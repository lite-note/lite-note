<template>
  <div class="welcome-world">
    <h1 class="title is-1">Lite Note</h1>

    <section v-if="savedFavoriteRepos.length">
      <router-link
        v-for="favoriteRepo in savedFavoriteRepos"
        :key="favoriteRepo._id"
        :to="{
          name: 'FluxNoteView',
          params: {
            user: username,
            repo: favoriteRepo.name
          }
        }"
        class="button"
      >
        {{ favoriteRepo.name }}
      </router-link>
    </section>

    <last-visited />

    <div class="get-started">
      <div class="buttons is-centered">
        <sign-in-github />
        <router-link
          :to="{
            name: 'FluxNoteView',
            params: { user: 'lite-note', repo: 'getting-started' }
          }"
          class="button"
          >Get started</router-link
        >
        <router-link v-if="isLogged" :to="{ name: 'RepoList' }" class="button"
          >Manage your repos</router-link
        >
      </div>
    </div>

    <form @submit.prevent>
      <div class="columns is-centered is-vcentered to-user-repo">
        <div class="column">https://github.com/</div>
        <div class="columns column is-mobile is-centered is-vcentered">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  v-model="userInput"
                  class="input"
                  type="text"
                  placeholder="user"
                />
              </div>
            </div>
          </div>
          /
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  v-model="repoInput"
                  class="input"
                  type="text"
                  placeholder="repo"
                />
              </div>
            </div>
          </div>
          <div class="column is-2">
            <button type="submit" class="button is-primary" @click="submit">
              go
            </button>
          </div>
        </div>
      </div>
    </form>

    <footer>
      Made with <img src="/assets/love.svg" alt="love" /> by
      <a
        href="http://github.com/jcalixte"
        target="_blank"
        rel="noopener noreferrer"
        >Julien</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SignInGithub from '@/components/SignInGithub.vue'
import { useForm } from '@/hooks/useForm.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import LastVisited from '@/modules/history/components/LastVisited.vue'
import { useFavoriteRepos } from '@/modules/repo/hooks/useFavoriteRepos.hook'

export default defineComponent({
  name: 'WelcomeWorld',
  components: { SignInGithub, LastVisited },
  setup() {
    const { isLogged, username } = useGitHubLogin()
    const { savedFavoriteRepos } = useFavoriteRepos()

    return { ...useForm(), isLogged, username, savedFavoriteRepos }
  }
})
</script>

<style lang="scss" scoped>
.welcome-world {
  padding: 1rem;
  margin: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  .get-started {
    margin: center;
    text-align: center;
  }

  .title {
    text-align: center;
  }
}

footer {
  img {
    vertical-align: middle;
  }
}

.to-user-repo {
  text-align: right;
}

@media screen and (max-width: 768px) {
  .to-user-repo {
    text-align: center;
  }
}
</style>
