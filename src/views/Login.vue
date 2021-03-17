<template>
  <div class="login">
    <button class="button is-primary" @click="back">
      <img src="@/assets/icons/left-arrow.svg" alt="back" />
    </button>
    <div class="columns is-centered">
      <div class="column is-one-third">
        <form @submit.prevent>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" v-model="user" />
            </div>
          </div>
          <div class="field">
            <label class="label">Token</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Personal Access Token"
                v-model="token"
              />
            </div>
          </div>
          <button
            class="button is-primary"
            type="submit"
            @click="saveCredentials(user, token)"
          >
            register token
          </button>
        </form>
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
    const user = ref('')
    const token = ref('')

    return { ...useGitHubLogin(), user, token, back: () => go(-1) }
  }
})
</script>

<style lang="scss" scoped>
.login {
  flex: 1;
}
</style>
