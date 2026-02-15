import { Author, getAka } from "@/modules/atproto/getAka"
import { PublicNoteListItem } from "@/modules/note/models/Note"
import { computedAsync } from "@vueuse/core"
import { computed, ref, Ref } from "vue"

export function usePublicNoteList(did?: Ref<string | undefined>) {
  const isLoading = ref(false)
  const notes = ref<PublicNoteListItem[]>([])
  const cursor = ref<string | null | undefined>(null)
  const canLoadMore = computed(() => cursor.value !== undefined)

  const onLoadMore = async () => {
    isLoading.value = true

    const path = did?.value ? `/${did.value}/notes` : "/notes"
    const noteAPI = new URL(path, "https://api.litenote.li212.fr")

    if (cursor.value) {
      noteAPI.searchParams.set("cursor", cursor.value)
    }

    const response = await fetch(noteAPI)
    const data: { notes: PublicNoteListItem[]; cursor: string | undefined } =
      await response.json()

    notes.value.push(...data.notes)
    cursor.value = data.cursor
    isLoading.value = false
  }

  const aka = computedAsync<Map<string, Author>>(async () => {
    if (notes.value.length === 0) {
      return new Map()
    }

    return getAka(new Set(notes.value.map((n) => n.did)))
  }, new Map())

  const getAlias = (did: string) =>
    aka.value.has(did) ? aka.value.get(did)?.alias : ""

  return { notes, isLoading, canLoadMore, onLoadMore, aka, getAlias }
}
