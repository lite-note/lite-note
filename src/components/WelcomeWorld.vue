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
      <theme-swap />
      Made with
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-heart"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#eb2f06"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
        />
      </svg>
      by
      <a
        href="http://github.com/jcalixte"
        target="_blank"
        rel="noopener noreferrer"
        >Julien</a
      >
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
  flex-wrap: wrap;
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
