<template>
  <a :href="url" class="sign-in-github button is-primary">
    <span>
      Sign in with
      <img src="@/assets/icons/github.svg" alt="GitHub" />
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const GITHUB_URL = 'https://github.com/login/oauth/authorize'

const CLIENT_ID = 'Iv1.12dc43d013ce3623'

const SCOPE = 'repo'

export default defineComponent({
  name: 'SignInGitHub',
  setup() {
    const url = new URL(GITHUB_URL)
    url.searchParams.set('client_id', CLIENT_ID)
    url.searchParams.set('scope', SCOPE)

    return {
      url
    }
  }
})
</script>

<style scoped lang="scss">
.sign-in-github {
  span {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }
}
</style>
