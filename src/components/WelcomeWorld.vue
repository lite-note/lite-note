<template>
  <div class="welcome-world">
    <h1 class="title is-1">Lite Note</h1>

    <repo-list />

    <last-visited />

    <div class="get-started">
      <div class="buttons is-centered">
        <sign-in-github />
        <router-link
          :to="{
            name: 'FluxNoteView',
            params: { user: 'lite-note', repo: 'getting-started' }
          }"
          class="btn"
          >Get started</router-link
        >
        <router-link v-if="isLogged" :to="{ name: 'RepoList' }" class="btn"
          >Manage your repos</router-link
        >
      </div>
    </div>

    <form @submit.prevent>
      <div class="columns-2 is-centered is-vcentered to-user-repo">
        <div>https://github.com/</div>
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

import RepoList from '@/components/RepoList.vue'
import SignInGithub from '@/components/SignInGithub.vue'
import { useForm } from '@/hooks/useForm.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import LastVisited from '@/modules/history/components/LastVisited.vue'

export default defineComponent({
  name: 'WelcomeWorld',
  components: { SignInGithub, LastVisited, RepoList },
  setup() {
    const { isLogged, username } = useGitHubLogin()

    return { ...useForm(), isLogged, username }
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
  display: flex;
  gap: 1rem;

  img {
    vertical-align: middle;
    margin-top: 0;
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
