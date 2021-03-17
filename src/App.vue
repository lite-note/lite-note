<template>
  <router-view v-if="isReady" class="app" />
</template>

<script lang="ts">
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const { isReady, accessToken } = useGitHubLogin()

    return { isReady, accessToken }
  }
})
</script>

<style lang="scss">
@import 'styles/app';
</style>
