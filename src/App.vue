<script lang="ts" setup>
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'

const { isReady } = useGitHubLogin()
</script>

<template>
  <router-view v-if="isReady" />
</template>

<style lang="scss">
@import 'styles/app';
</style>
