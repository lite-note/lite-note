<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <button class="button is-small is-white back-button" @click="goBack">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrow-narrow-left"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="12" x2="9" y2="16" />
      <line x1="5" y1="12" x2="9" y2="8" />
    </svg>
    return
  </button>
</template>
