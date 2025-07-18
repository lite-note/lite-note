<script lang="ts" setup>
import { format } from "date-fns"
import { computed, ref, watch } from "vue"
import FluxNote from "@/components/FluxNote.vue"
import { useEditionMode } from "@/hooks/useEditionMode"
import { useGitHubContent } from "@/hooks/useGitHubContent.hook"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { prepareNoteCache } from "@/modules/note/cache/prepareNoteCache"
import EditNote from "@/modules/note/components/EditNote.vue"
import { useFolderNotes } from "@/modules/note/hooks/useFolderNotes"
import { encodeUTF8ToBase64 } from "@/utils/decodeBase64ToUTF8"
import FontChange from "@/components/FontChange.vue"

const FLEETING_NOTES_FOLDER = ["inbox", "_inbox"]

const props = defineProps<{ user: string; repo: string }>()
const user = computed(() => props.user)
const repo = computed(() => props.repo)

const { addStackedNote } = useRouteQueryStackedNotes()
const { content } = useFolderNotes(FLEETING_NOTES_FOLDER)

const today = format(new Date(), "yyyy-MM-dd")
const newContentPath = `_inbox/${today}.md`
const initialContent = ``
const newContent = ref(initialContent)
const { mode, toggleMode } = useEditionMode()

const { createFile } = useGitHubContent({
  repo: repo.value,
  user: user.value,
})

const hasTodayNote = computed(() => content.value.includes(today))

watch(mode, async (newMode) => {
  if (newMode === "read" && newContent.value.trim() !== initialContent) {
    const content = `# ${new Date().toLocaleDateString()}\n\n${
      newContent.value
    }`

    const newSha = await createFile({
      content,
      path: newContentPath,
    })

    if (!newSha) {
      return
    }

    newContent.value = initialContent
    const { saveCacheNote } = prepareNoteCache(newSha, newContentPath)
    await saveCacheNote(encodeUTF8ToBase64(content), {
      editedSha: newSha,
      path: newContentPath,
    })

    addStackedNote("", newSha)
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
      <div class="columns">
        <div class="column" v-if="!hasTodayNote">
          <button class="btn btn-secondary" @click="toggleMode">
            new fleeting note
          </button>
        </div>
        <br />
        <div class="column">
          <font-change />
        </div>
      </div>

      <div v-if="mode === 'edit'">
        <edit-note v-model="newContent" />
        <div class="columns">
          <div class="column is-half">
            <button class="btn btn-outline" @click="toggleMode">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-device-floppy"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"
                />
                <circle cx="12" cy="14" r="2" />
                <polyline points="14 4 14 8 8 8 8 4" />
              </svg>
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
