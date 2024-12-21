<template>
  <div class="welcome-world">
    <h1 class="title is-1">Lite Note</h1>

    <repo-list />

    <last-visited />

    <div class="get-started">
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

    <form class="github-form" @submit.prevent>
      <div>github.com/</div>
      <input
        v-model="userInput"
        class="input input-ghost"
        type="text"
        placeholder="user"
      />
      /
      <input
        v-model="repoInput"
        class="input input-ghost"
        type="text"
        placeholder="repo"
      />
      <button type="submit" class="btn btn-primary" @click="submit">go</button>
    </form>

    <footer>
      Made with <img src="/assets/love.svg" alt="love" /> by
      <a
        href="http://github.com/jcalixte"
        target="_blank"
        rel="noopener noreferrer"
        >Julien</a
      >
      <theme-swap />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import RepoList from '@/components/RepoList.vue'
import SignInGithub from '@/components/SignInGithub.vue'
import ThemeSwap from '@/components/ThemeSwap.vue'
import { useForm } from '@/hooks/useForm.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import LastVisited from '@/modules/history/components/LastVisited.vue'

const { isLogged } = useGitHubLogin()
const { userInput, repoInput, submit } = useForm()
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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .title {
    text-align: center;
  }
}
.github-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  input {
    max-width: 140px;
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
