<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()

const handleInput = (input: string) => {
  emits('update:modelValue', input)
}
</script>

<template>
  <div>
    <pre
      v-once
      contenteditable
      @input="(e) => handleInput((e.target as any)?.innerText ?? '')"
      >{{ modelValue }}</pre
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
  text-align: left;
}
</style>
