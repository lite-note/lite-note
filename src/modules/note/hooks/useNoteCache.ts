import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { Note } from '@/modules/note/models/Note'
import { useAsyncState } from '@vueuse/core'
import { computed } from 'vue'

export const useNoteCache = (sha: string) => {
  const noteId = computed(() => data.generateId(DataType.Note, sha))
  const getCachedNote = async () => data.get<DataType.Note, Note>(noteId.value)

  const cachedNote = useAsyncState(getCachedNote, null)

  const saveCacheNote = async (content: string) => {
    const newNote: Note = {
      _id: noteId.value,
      $type: DataType.Note,
      content
    }

    await data.update(newNote)

    await cachedNote.execute()
  }

  return {
    cachedNote: cachedNote.state,
    isReady: cachedNote.isReady,
    getCachedNote,
    saveCacheNote
  }
}
