import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { Note } from '@/modules/note/models/Note'

export const prepareNoteCache = (sha: string) => {
  const noteId = data.generateId(DataType.Note, sha)
  const getCachedNote = async () => data.get<DataType.Note, Note>(noteId)

  const saveCacheNote = async (content: string) => {
    const newNote: Note = {
      _id: noteId,
      $type: DataType.Note,
      content
    }

    await data.update(newNote)
  }

  return {
    getCachedNote,
    saveCacheNote
  }
}
