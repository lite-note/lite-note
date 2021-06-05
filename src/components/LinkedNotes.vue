<template>
  <div class="linked-notes"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LinkedNotes',
  props: {
    sha: { type: String, required: true }
  }
})
</script>

<style scoped lang="scss">
.linked-notes {
}
</style>
