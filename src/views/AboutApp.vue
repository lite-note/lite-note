<template>
  <div class="about content">
    <go-back />
    <main>
      Work in progress:
      <ol>
        <li>header note for quick actions ✅</li>
        <li>offline notes ✅</li>
        <li>full path resolver between notes ✅</li>
        <li>draft & fleeting notes folders ✅</li>
        <li>private & public notes tutorial ✅</li>
        <li>
          custom settings:
          <ul>
            <li>light & dark modes ✅</li>
            <li>font families ✅</li>
          </ul>
        </li>
      </ol>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GoBack from '@/components/GoBack.vue'

export default defineComponent({
  components: { GoBack }
})
</script>

<style lang="scss" scoped>
.about {
  padding: 1rem;
}
</style>
