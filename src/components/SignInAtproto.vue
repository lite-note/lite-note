<script setup lang="ts">
import { ref } from "vue"

import { useATProtoLogin } from "@/hooks/useATProtoLogin.hook"

const { handle, isLoggedIn, signIn, signOut } = useATProtoLogin()

const inputHandle = ref("")

const onSignIn = () => {
  if (inputHandle.value) {
    signIn(inputHandle.value)
  }
}
</script>

<template>
  <div v-if="isLoggedIn" class="sign-in-atproto is-signed-in">
    <span>{{ handle }}</span>
    <button class="btn" @click="signOut">Sign out</button>
  </div>
  <div v-else class="sign-in-atproto join">
    <input
      v-model="inputHandle"
      class="input input-sm join-item"
      type="text"
      placeholder="alice.bsky.social"
      @keyup.enter="onSignIn"
    />
    <button class="btn input-sm join-item" @click="onSignIn">
      Sign in with Bluesky
    </button>
  </div>
</template>

<style scoped>
.is-signed-in {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
