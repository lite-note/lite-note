<template>
  <div class="about content">
    <h1 class="title is-1">Lite Note</h1>
    <go-back />
    <hr />
    <main>
      Work in progress:
      <ol>
        <li>offline notes ⏳</li>
        <li>full path resolver between notes</li>
        <li>draft & "note on the fly" folders</li>
        <li>login with GitHub "Personal Access Token" tutorial</li>
        <li>private & public notes tutorial</li>
        <li>
          custom settings:
          <ul>
            <li>light & dark modes</li>
            <li>font families</li>
          </ul>
        </li>
      </ol>
    </main>
  </div>
</template>

<script lang="ts">
import GoBack from '@/components/GoBack.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { GoBack }
})
</script>

<style lang="scss" scoped>
.about {
  padding: 1rem;
}
</style>
