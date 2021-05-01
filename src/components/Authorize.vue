<template>
  <div class="authorize">
    <div v-if="hasError">An error occured when sign in...</div>
  </div>
</template>

<script lang="ts">
import { GithubToken } from '@/modules/user/interfaces/GithubToken'
import { GithubTokenError } from '@/modules/user/interfaces/GithubTokenError'
import { useGitHubLogin } from '@/hooks/useGitHubLogin.hook'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const AUTHENTICATION_SERVER = 'https://litenote.li212.fr'

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
        const authenticationServerURL = new URL(AUTHENTICATION_SERVER)
        authenticationServerURL.searchParams.set('code', code.toString())

        const response = await fetch(authenticationServerURL.toString())
        const body = (await response.json()) as GithubToken | GithubTokenError

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

<style scoped lang="scss">
.authorize {
}
</style>
