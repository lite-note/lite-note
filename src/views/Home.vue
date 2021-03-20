<template>
  <div class="home content" v-if="!user || !repo">
    <welcome-world />
  </div>
  <flux-note :user="user" :repo="repo" :key="routeKey" v-else />
</template>

<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  computed,
  toRefs,
  watch
} from 'vue'
import { useQueryStackedNotes } from '@/hooks/useQueryStackedNotes.hook'

const FluxNote = defineAsyncComponent(() => import('@/components/FluxNote.vue'))

const WelcomeWorld = defineAsyncComponent(() =>
  import('@/components/WelcomeWorld.vue')
)

export default defineComponent({
  name: 'Home',
  components: {
    WelcomeWorld,
    FluxNote
  },
  props: {
    user: { type: String, required: false, default: '' },
    repo: { type: String, required: false, default: '' }
  },
  setup(props) {
    const refProps = toRefs(props)
    const { resetStackedNotes } = useQueryStackedNotes()

    watch([refProps.user, refProps.repo], () => {
      resetStackedNotes()
    })

    return {
      resetStackedNotes,
      routeKey: computed(() => `${props.user}-${props.repo}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1;
}
</style>
