<script lang="ts" setup>
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
</script>

<template>
  <router-view v-if="isReady" class="app" />
</template>

<style lang="scss">
@import 'styles/app';
</style>
