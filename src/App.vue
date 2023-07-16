<script lang="ts" setup>
import NewVersion from '@/components/NewVersion.vue'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
</script>

<template>
  <router-view v-if="isReady" />
  <new-version />
</template>

<style lang="scss">
@import 'styles/app';
</style>
