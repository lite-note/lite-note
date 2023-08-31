<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, ref, watch } from 'vue'

import FluxNote from '@/components/FluxNote.vue'
import { useEditionMode } from '@/hooks/useEditionMode'
import { useGitHubContent } from '@/hooks/useGitHubContent.hook'
import { useRouteQueryStackedNotes } from '@/hooks/useRouteQueryStackedNotes.hook'
import { prepareNoteCache } from '@/modules/note/cache/prepareNoteCache'
import EditNote from '@/modules/note/components/EditNote.vue'
import { useFolderNotes } from '@/modules/note/hooks/useFolderNotes'
import { encodeUTF8ToBase64 } from '@/utils/decodeBase64ToUTF8'

const FLEETING_NOTES_FOLDER = ['inbox', '_inbox']

const props = defineProps<{ user: string; repo: string }>()
const user = computed(() => props.user)
const repo = computed(() => props.repo)

const { addStackedNote } = useRouteQueryStackedNotes()
const { content } = useFolderNotes(FLEETING_NOTES_FOLDER)

const today = format(new Date(), 'yyyy-MM-dd')
const newContentPath = `_inbox/${today}.md`
const initialContent = ``
const newContent = ref(initialContent)
const { mode, toggleMode } = useEditionMode()

const { createFile } = useGitHubContent({
  repo: repo.value,
  user: user.value
})

const hasTodayNote = computed(() => content.value.includes(today))

watch(mode, async (newMode) => {
  if (newMode === 'read' && newContent.value.trim() !== initialContent) {
    const content = `# ${new Date().toLocaleDateString()}\n\n${
      newContent.value
    }`

    const newSha = await createFile({
      content,
      path: newContentPath
    })

    if (!newSha) {
      return
    }

    newContent.value = initialContent
    const { saveCacheNote } = prepareNoteCache(newSha)
    await saveCacheNote(encodeUTF8ToBase64(content))

    addStackedNote('', newSha)
  }
})
</script>

<template>
  <div class="fleeting-notes">
    <flux-note
      key="fleeting-notes"
      :user="user"
      :repo="repo"
      :content="content"
    >
      <h3 class="subtitle is-3">Inbox</h3>
      <div v-if="!hasTodayNote" class="columns is-centered">
        <div class="column is-half is-centered">
          <button class="button is-primary is-light" @click="toggleMode">
            new fleeting note
          </button>
        </div>
      </div>
      <div v-if="mode === 'edit'">
        <edit-note v-model="newContent" />
        <div class="columns is-centered">
          <div class="column is-half is-centered">
            <button class="button is-light" @click="toggleMode">
              <img src="@/assets/icons/saved.svg" alt="save" />
            </button>
          </div>
        </div>
      </div>
    </flux-note>
  </div>
</template>

<style scoped lang="scss">
.fleeting-notes {
  display: flex;
  flex: 1;

  .subtitle {
    text-align: center;
  }

  .column {
    display: flex;
    justify-content: center;
  }
}
</style>
