import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { Note } from '@/modules/note/models/Note'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

export const prepareNoteCache = (sha: string, path?: string) => {
  const store = useUserRepoStore()

  const noteId = data.generateId(DataType.Note, sha)
  const notePath = path ? data.generateId(DataType.Note, path) : null
  const getCachedNote = async () => {
    const note = await data.get<DataType.Note, Note>(noteId)

    if (note) {
      return note
    }

    if (notePath) {
      return data.get<DataType.Note, Note>(notePath)
    }

    return null
  }

  const saveCacheNote = async (
    content: string,
    params?: { editedSha?: string; path?: string }
  ) => {
    const newNote: Note = {
      _id: noteId,
      $type: DataType.Note,
      content,
      editedSha: params?.editedSha
    }

    if (params && params.path) {
      store.addFile({
        path: params.path,
        sha: params.editedSha
      })
    }

    await data.update(newNote)

    if (notePath) {
      await data.update({
        ...newNote,
        _id: notePath
      })
    }
  }

  return {
    getCachedNote,
    saveCacheNote
  }
}
