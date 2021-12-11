<template>
  <div class="authorize-user">
    <div v-if="hasError">An error occured when sign in...</div>
  </div>
</template>

<script lang="ts">
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signIn } from '@/modules/user/service/signIn'

export default defineComponent({
  name: 'AuthorizeUser',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { saveCredentials } = useGitHubLogin()

    const code = route.query.code
    let hasError = ref(false)

    onBeforeMount(async () => {
      if (code) {
        const token = await signIn(code.toString())

        if ('error' in token) {
          hasError.value = true
        } else {
          token.access_token
          saveCredentials(token)
        }

        router.replace({ name: 'Home' })
      }
    })

    return {
      code,
      hasError
    }
  }
})
</script>
