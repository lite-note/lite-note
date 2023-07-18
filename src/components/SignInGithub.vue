<script lang="ts" setup>

const GITHUB_URL = 'https://github.com/login/oauth/authorize'

const CLIENT_ID = 'Iv1.12dc43d013ce3623'
const SCOPE = 'repo'
const REDIRECT_URI = window.location.origin

const url = new URL(GITHUB_URL)
url.searchParams.set('client_id', CLIENT_ID)
url.searchParams.set('scope', SCOPE)
url.searchParams.set('redirect_uri', REDIRECT_URI)

const href = url.toString()
</script>

<template>
  <a :href="href" class="sign-in-github button is-primary">
    <span>
      Sign in with
      <img src="@/assets/icons/github.svg" alt="GitHub" />
    </span>
  </a>
</template>

<style scoped lang="scss">
.sign-in-github {
  span {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }
}
</style>
