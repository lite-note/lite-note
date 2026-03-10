<script lang="ts" setup>
import NewVersion from '@/components/NewVersion.vue'
import { useATProtoLogin } from '@/hooks/useATProtoLogin.hook'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
const { isATProtoReady } = useATProtoLogin()
</script>

<template>
  <div id="main-app" class="prose">
    <router-view v-if="isReady && isATProtoReady" />

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
