<script setup lang="ts">
import { computed, defineAsyncComponent, watch } from "vue"
import { useUserRepoStore } from "@/modules/repo/store/userRepo.store"
import { useFile } from "@/hooks/useFile.hook"
import { computedAsync } from "@vueuse/core"

const FluxNote = defineAsyncComponent(() => import("@/components/FluxNote.vue"))
const props = defineProps<{ user: string; repo: string }>()
const user = computed(() => props.user)
const repo = computed(() => props.repo)

const store = useUserRepoStore()

const todoNote = computed(() =>
  store.files.find((file) => file.path?.endsWith("_todo/todo.md")),
)

const content = computedAsync(() => {
  if (!todoNote.value) {
    return ""
  }
  const { getContent } = useFile(todoNote.value?.sha ?? "", false)

  return getContent()
})
</script>

<template>
  <div class="todo-notes">
    <flux-note
      key="todo-notes"
      :user="user"
      :repo="repo"
      :content="content"
      :parse-content="false"
    />
  </div>
</template>

<style lang="scss">
.todo-notes {
  flex: 1;

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
}
</style>
