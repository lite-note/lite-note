<template>
  <button class="button is-white go-back" @click="back">
    <img src="/assets/dark-left-arrow.svg" alt="back" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GoBack',
  setup() {
    const { push } = useRouter()

    return {
      back: () =>
        push({
          name: 'Home'
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.go-back {
  margin: 10px 0;
}
</style>
