<template>
  <div class="login-github">
    <br />
    <a
      class="btn btn-primary"
      :href="url.toString()"
      target="_blank"
      rel="noopener noreferrer"
    >
      login to
      <img src="/assets/github.svg" alt="GitHub icon" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginGithub',
  setup() {
    const url = new URL('https://github.com/login/oauth/authorize')
    url.searchParams.append('client_id', 'Iv1.87be14adcc912fa0')
    url.searchParams.append('redirect_uri', location.href)
    url.searchParams.append('scope', 'repo')

    return {
      url
    }
  }
})
</script>

<style scoped>
img {
  margin-top: 0;
  margin-bottom: 0;
}
</style>