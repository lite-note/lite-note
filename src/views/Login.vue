<template>
  <div class="login content">
    <button class="button is-white go-back" @click="back">
      <img src="@/assets/icons/dark-left-arrow.svg" alt="back" />
    </button>
    <div class="columns is-centered">
      <div class="column is-one-third">
        <form @submit.prevent>
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="GitHub username"
                  v-model="user"
                />
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Token</label>
            </div>
            <div class="field-body">
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Personal Access Token"
                  v-model="token"
                />
              </div>
            </div>
          </div>
          <div class="action-container">
            <button
              class="button is-primary"
              type="submit"
              @click="saveCredentials(user, token)"
            >
              register token
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-one-third">
        <p>
          Want to know how to login with a personal access token? Take a look at
          <a
            href="https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub documentation</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const { go } = useRouter()
    const { username, accessToken, ...form } = useGitHubLogin()
    const user = ref(username.value ?? '')
    const token = ref(accessToken.value ?? '')

    return { ...form, user, token, back: () => go(-1) }
  }
})
</script>

<style lang="scss" scoped>
.login {
  flex: 1;

  .go-back {
    margin: 10px 0;
  }

  form {
    display: flex;
    flex-direction: column;

    .field-label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .field-body {
      flex: 1;
    }

    .action-container {
      margin: auto;
    }
  }
}
</style>
