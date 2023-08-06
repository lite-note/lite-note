<template>
  <div class="welcome-world">
    <div class="columns is-vcentered">
      <div class="column get-started">
        <h3 class="title is-3">Lite Note</h3>
        <div class="buttons is-centered">
          <router-link
            :to="{
              name: 'FluxNoteView',
              params: { user: 'lite-note', repo: 'getting-started' }
            }"
            class="button is-primary"
            >Get started</router-link
          >
          <router-link class="button" :to="{ name: 'About' }"
            >about</router-link
          >
        </div>
        <sign-in-github class="github-login" />
      </div>
      <div class="column">
        <p>
          <router-link v-if="isLogged" :to="{ name: 'RepoList' }"
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
                  name: 'FluxNoteView',
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

    <last-visited />

    <footer>
      <p>
        Made with <img src="@/assets/icons/love.svg" alt="love" /> by
        <a
          href="http://github.com/jcalixte"
          target="_blank"
          rel="noopener noreferrer"
          >Julien</a
        >
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import SignInGithub from '@/components/SignInGithub.vue'
import { useForm } from '@/hooks/useForm.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import LastVisited from '@/modules/history/components/LastVisited.vue'
import { useFavoriteRepos } from '@/modules/repo/hooks/useFavoriteRepos.hook'
import { defineComponent } from 'vue'

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

  h3,
  h4 {
    text-align: center;
  }

  .github-login {
    margin-top: 1rem;
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
