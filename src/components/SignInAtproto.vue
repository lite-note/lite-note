<script setup lang="ts">
import { ref } from 'vue'

import { useATProtoLogin } from '@/hooks/useATProtoLogin.hook'

const { handle, isLoggedIn, signIn, signOut } = useATProtoLogin()

const inputHandle = ref('')

const onSignIn = () => {
  if (inputHandle.value) {
    signIn(inputHandle.value)
  }
}
</script>

<template>
  <div v-if="isLoggedIn" class="sign-in-atproto">
    <span>{{ handle }}</span>
    <button class="btn btn-sm" @click="signOut">Sign out</button>
  </div>
  <div v-else class="sign-in-atproto">
    <input
      v-model="inputHandle"
      class="input input-sm"
      type="text"
      placeholder="yourhandle.bsky.social"
      @keyup.enter="onSignIn"
    />
    <button class="btn btn-sm" @click="onSignIn">Sign in with Bluesky</button>
  </div>
</template>
