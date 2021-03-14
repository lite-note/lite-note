<template>
  <div class="welcome-world">
    <h1 class="title is-1">About "Lite notes"</h1>

    <ol>
      <li>
        Take notes on VS code (<a
          href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#review-details"
          target="_blank"
          rel="noopener noreferrer"
          >this extension</a
        >
        may be necessary)
      </li>
      <li>
        Push to GitHub
      </li>
      <li>
        Read it here
      </li>
      <li>
        Share it with an URL
      </li>
    </ol>

    <form @submit.prevent>
      <div class="columns is-centered is-vcentered to-user-repo">
        <div class="column">
          https://github.com/
        </div>
        <div class="columns column is-mobile is-centered is-vcentered">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="userInput"
                  placeholder="user"
                />
              </div>
            </div>
          </div>
          /
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="repoInput"
                  placeholder="repo"
                />
              </div>
            </div>
          </div>
          <div class="column is-2">
            <button type="submit" class="button is-primary" @click="submit">
              go
            </button>
          </div>
        </div>
      </div>
    </form>

    <footer>
      <p>
        This web app is clearly inspired by
        <a
          href="https://notes.andymatuschak.org/About_these_notes"
          target="_blank"
          rel="noopener noreferrer"
          >Andy Matuschak's website</a
        >. May "Lite note" be useful to everyone.
      </p>

      <p>
        Made with <img src="@/assets/icons/love.svg" alt="love" /> by
        <a
          href="http://github.com/jcalixte"
          target="_blank"
          rel="noopener noreferrer"
          >Julien</a
        >
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/useForm.hook'

export default defineComponent({
  name: 'WelcomeWord',
  setup() {
    return { ...useForm() }
  }
})
</script>

<style lang="scss" scoped>
.welcome-world {
  margin: auto;
  display: flex;
  flex-direction: column;
}

footer {
  img {
    vertical-align: middle;
  }
}

.to-user-repo {
  text-align: right;
}

@media screen and (max-width: 768px) {
  .to-user-repo {
    text-align: center;
  }
}
</style>
