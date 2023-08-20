<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ sha: string; initialContent: string }>()
const content = ref('')

onMounted(() => {
  content.value = props.initialContent
})

const handleInput = (input: string) => {
  content.value = input
}
</script>

<template>
  <div>
    <pre
      contenteditable
      @input="(e) => handleInput((e.target as any)?.innerText ?? '')"
      >{{ initialContent }}</pre
    >
  </div>
</template>

<style scoped lang="scss">
pre {
  width: 100%;
  height: 100%;
  border: none;
  flex: 1;
  resize: none;
  white-space: pre-wrap;
}
</style>
