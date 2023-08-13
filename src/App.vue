<script lang="ts" setup>
import NewVersion from '@/components/NewVersion.vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
</script>

<template>
  <div id="main-app">
    <router-view v-if="isReady" />
    <new-version />
  </div>
</template>

<style lang="scss">
@import 'styles/app';

#main-app {
  height: 100vh;
  display: flex;
  flex: 1;
}
</style>
