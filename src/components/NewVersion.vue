<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue"
import { ref } from "vue"

import LiteLoading from "@/components/LiteLoading.vue"

const devMode = ref(false) // import.meta.env.DEV
const isLoading = ref(false)
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
  devMode.value = false
}

const reload = () => {
  isLoading.value = true
  updateServiceWorker()
}
</script>

<template>
  <div
    v-if="devMode || offlineReady || needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div>
      <span v-if="offlineReady">App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <div class="buttons">
      <button
        v-if="devMode || needRefresh"
        class="btn btn-primary"
        @click="reload"
      >
        <LiteLoading v-if="isLoading" />
        <span v-else>Reload</span>
      </button>
      <button class="btn" @click="close">Close</button>
    </div>
  </div>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1rem;
  padding: 0.5rem;
  width: 220px;
  color: var(--primary-color);
  border: var(--primary-color) 2px solid;
  border-radius: 4px;
  background-color: var(--color-base-100);
  color: var(--color-base-content);
}

.buttons {
  display: flex;
  gap: 1rem;
}

button {
  flex: 1;
}
</style>
