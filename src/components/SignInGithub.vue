<script lang="ts" setup>
const GITHUB_URL = 'https://github.com/login/oauth/authorize'

const CLIENT_ID = 'Iv1.12dc43d013ce3623'
const SCOPE = 'repo%20workflow'
const REDIRECT_URI = window.location.origin

const url = new URL(GITHUB_URL)
url.searchParams.set('client_id', CLIENT_ID)
url.searchParams.set('scope', SCOPE)
url.searchParams.set('redirect_uri', REDIRECT_URI)

const href = url.toString()
</script>

<template>
  <a :href="href" class="sign-in-github btn btn-primary">
    Sign in with
    <img src="/assets/github.svg" alt="GitHub" />
  </a>
</template>

<style scoped lang="scss">
.sign-in-github {
  img {
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
</style>
