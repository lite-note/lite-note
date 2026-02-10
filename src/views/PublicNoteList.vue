<script setup lang="ts">
import { noteRouter } from "@/modules/post/data/client"

const { data: notes, isLoading } = noteRouter.noteLists.get.useQuery(["notes"])
</script>

<template>
  <div class="public-note-view" v-if="isLoading">
    <ul>
      <li v-for="note in notes">{{ note.did }} / {{ note.rkey }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.public-note-view {
}
</style>
