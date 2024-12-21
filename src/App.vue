<script lang="ts" setup>
import NewVersion from '@/components/NewVersion.vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
</script>

<template>
  <div id="main-app" class="prose">
    <router-view v-if="isReady" />

    <new-version />
  </div>
</template>

<style lang="scss">
#main-app {
  height: 100vh;
  display: flex;
  flex: 1;
}
</style>
