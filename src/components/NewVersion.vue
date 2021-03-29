<template>
  <aside class="new-version" v-if="hasNewVersion">
    <button class="button is-primary" @click="reload">
      new version available
    </button>
  </aside>
</template>

<script lang="ts">
import { serviceWorkerBusEvent } from '@/bus/serviceWorkerEventBus'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'NewVersion',
  setup() {
    const hasNewVersion = ref(false)
    onMounted(() => {
      serviceWorkerBusEvent.addEventBusListener(
        () => {
          hasNewVersion.value = true
        },
        {
          once: true,
          retro: true
        }
      )
    })

    return { hasNewVersion, reload: () => location.reload() }
  }
})
</script>
