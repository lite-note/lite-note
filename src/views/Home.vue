<template>
  <div class="home">
    <p class="note" v-html="readme"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick } from 'vue'
import { useRepo } from '@/hooks/useRepo.hook'
import { useLinks } from '@/hooks/useLinks.hook'

export default defineComponent({
  name: 'Home',
  setup() {
    const { readme } = useRepo('jcalixte', 'notes')
    const { listenToClick } = useLinks('note')

    watch(readme, () => {
      if (readme.value) {
        nextTick(() => {
          listenToClick()
        })
      }
    })

    return {
      readme
    }
  }
})
</script>
