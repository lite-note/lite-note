<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
const goHome = () => router.push({ name: "Home" })
</script>

<template>
  <a class="btn btn-ghost btn-circle btn-lg" @click="goHome">
    <img src="/favicon.png" alt="Remanso icon" />
  </a>
</template>

<style>
img {
  box-shadow: none;
}
</style>
