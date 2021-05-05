<template>
  <div class="authorize">
    <div v-if="hasError">An error occured when sign in...</div>
  </div>
</template>

<script lang="ts">
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signIn } from '@/modules/user/service/signIn'

export default defineComponent({
  name: 'Authorize',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { saveCredentials } = useGitHubLogin()

    const code = route.query.code
    let hasError = ref(false)

    onBeforeMount(async () => {
      if (code) {
        const body = await signIn(code.toString())

        if ('error' in body) {
          hasError.value = true
        } else {
          body.access_token
          saveCredentials(body)
        }

        router.push({ name: 'Home' })
      }
    })

    return {
      code,
      hasError
    }
  }
})
</script>
