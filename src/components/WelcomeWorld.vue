<template>
  <div class="welcome-world">
    <div class="columns">
      <div class="column">
        <h3 class="title is-3">Lite Note</h3>
        <h4 class="subtitle is-4">Get started</h4>
        <ol>
          <li>
            Take notes your favorite
            <router-link :to="{ name: 'TextEditor' }">text editor</router-link>
          </li>
          <li>
            Push to GitHub
          </li>
          <li>
            Read it here
          </li>
          <li>
            Share it with an URL
          </li>
          <li>
            Or do it
            <router-link :to="{ name: 'Login' }">privately</router-link>
          </li>
        </ol>
      </div>
      <div class="column">
        <p>
          <router-link :to="{ name: 'RepoList' }" v-if="isLogged"
            >Manage your repos</router-link
          >
        </p>
        <section v-if="savedFavoriteRepos.length">
          <h4 class="subtitle is-4">
            ⭐
          </h4>
          <ul>
            <li
              v-for="favoriteRepo in savedFavoriteRepos"
              :key="favoriteRepo.id"
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
        This web app was inspired by
        <a
          href="https://notes.andymatuschak.org/About_these_notes"
          target="_blank"
          rel="noopener noreferrer"
          >Andy Matuschak's website</a
        >.
      </p>

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
