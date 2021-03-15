<template>
  <div class="text-editor content">
    <button class="button is-primary" @click="back">
      <img src="@/assets/icons/left-arrow.svg" alt="back" />
    </button>
    <hr />
    <p>
      Lite note is used to display efficiently notes. To edit them, use your
      favorite text editor.
    </p>
    <ul>
      <li>
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          >VS Code</a
        >
        <p>Useful extensions:</p>
        <ul>
          <li>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one"
              target="_blank"
              rel="noopener noreferrer"
              >Markdown All in One</a
            >
          </li>
          <li>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced"
              target="_blank"
              rel="noopener noreferrer"
              >Markdown Preview Enhanced</a
            >
          </li>
        </ul>
      </li>
      <li>
        <a href="https://atom.io/" target="_blank" rel="noopener noreferrer"
          >Atom</a
        >
        <ul>
          <li>
            <a
              href="https://atom.io/packages/markdown-writer"
              target="_blank"
              rel="noopener noreferrer"
              >Markdown Writer</a
            >
          </li>
          <li>
            <a
              href="https://atom.io/packages/language-markdown"
              target="_blank"
              rel="noopener noreferrer"
              >Language Markdown</a
            >
          </li>
          <li>
            <a
              href="https://atom.io/packages/markdown-preview-plus"
              target="_blank"
              rel="noopener noreferrer"
              >Markdown Preview Plus</a
            >
          </li>
          <li>
            <a
              href="https://atom.io/packages/markdown-table-editor"
              target="_blank"
              rel="noopener noreferrer"
              >Markdown Table Editor</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TextEditor',
  setup() {
    const { go } = useRouter()

    return {
      back: () => go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.text-editor {
  padding: 1rem;
  flex: 1;
}
</style>
