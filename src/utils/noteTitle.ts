export const filenameToNoteTitle = (title: string) =>
  title.replaceAll('/', ' / ').replaceAll('-', ' ')
