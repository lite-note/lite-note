<template>
  <div class="fleeting-notes"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FleetingNotes',
  props: {
    user: { type: String, required: true },
    repo: { type: String, required: true }
  }
})
</script>

<style scoped lang="scss">
.fleeting-notes {
}
</style>
