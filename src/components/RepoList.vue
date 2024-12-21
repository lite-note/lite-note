<script setup lang="ts">
import fontColorContrast from 'font-color-contrast'
import { getHex } from 'pastel-color'

import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { useFavoriteRepos } from '@/modules/repo/hooks/useFavoriteRepos.hook'

const { username } = useGitHubLogin()
const { savedFavoriteRepos } = useFavoriteRepos()

const getStyle = (repo: string) => {
  const backgroundColor = getHex(repo)
  return { backgroundColor, color: fontColorContrast(backgroundColor) }
}
</script>

<template>
  <section v-if="savedFavoriteRepos.length" class="repo-list">
    <router-link
      v-for="favoriteRepo in savedFavoriteRepos"
      :key="favoriteRepo._id"
      :to="{
        name: 'FluxNoteView',
        params: {
          user: username,
          repo: favoriteRepo.name
        }
      }"
      class="btn"
      :style="getStyle(`${favoriteRepo.name}-${username}`)"
    >
      {{ favoriteRepo.name }}
    </router-link>
  </section>
</template>

<style scoped lang="scss">
.repo-list {
  a {
    border: 0;
    width: 160px;
    height: 90px;
  }
}
</style>
