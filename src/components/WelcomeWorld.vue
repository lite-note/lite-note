<template>
  <div class="welcome-world">
    <div class="columns is-vcentered">
      <div class="column get-started">
        <h3 class="title is-3">Lite Note</h3>
        <router-link
          :to="{
            name: 'Home',
            params: { user: 'lite-note', repo: 'getting-started' }
          }"
          class="button is-primary"
          >Get started</router-link
        >
      </div>
      <div class="column">
        <p>
          <router-link :to="{ name: 'RepoList' }" v-if="isLogged"
            >Manage your repos</router-link
          >
        </p>
        <section v-if="savedFavoriteRepos.length">
          <ul>
            <li
              v-for="favoriteRepo in savedFavoriteRepos"
              :key="favoriteRepo._id"
            >
              <router-link
                :to="{
                  name: 'Home',
                  params: {
                    user: username,
                    repo: favoriteRepo.name
                  }
                }"
              >
                {{ favoriteRepo.name }}
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <form @submit.prevent>
      <div class="columns is-centered is-vcentered to-user-repo">
        <div class="column">
          https://github.com/
        </div>
        <div class="columns column is-mobile is-centered is-vcentered">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="userInput"
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
                  class="input"
                  type="text"
                  v-model="repoInput"
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
      <p>
        Made with <img src="@/assets/icons/love.svg" alt="love" /> by
        <a
          href="http://github.com/jcalixte"
          target="_blank"
          rel="noopener noreferrer"
          >Julien</a
        >
        |
        <router-link :to="{ name: 'About' }">about</router-link>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/useForm.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useFavoriteRepos } from '@/modules/repo/hooks/useFavoriteRepos.hook'

export default defineComponent({
  name: 'WelcomeWord',
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
  flex-direction: column;

  .get-started {
    margin: center;
    text-align: center;
  }

  h3,
  h4 {
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
