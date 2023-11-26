import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { Note } from '@/modules/note/models/Note'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'

export const prepareNoteCache = (sha: string) => {
  const store = useUserRepoStore()

  const noteId = data.generateId(DataType.Note, sha)
  const getCachedNote = async () => data.get<DataType.Note, Note>(noteId)

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

    store.addFile({
      path: params?.path,
      sha: params?.editedSha
    })

    await data.update(newNote)
  }

  return {
    getCachedNote,
    saveCacheNote
  }
}
