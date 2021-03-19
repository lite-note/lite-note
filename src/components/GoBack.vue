<template>
  <button class="button is-primary go-back" @click="back">
    <img src="@/assets/icons/left-arrow.svg" alt="back" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GoBack',
  setup() {
    const { go } = useRouter()

    return {
      back: () => go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.go-back {
}
</style>
