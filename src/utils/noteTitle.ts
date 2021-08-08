export const filenameToNoteTitle = (title: string) =>
  title.replaceAll('/', ' / ').replaceAll('-', ' ')

export const pathToNoteTitle = (path: string) => {
  const fileNames = path.split('.')

  fileNames.pop()
  return fileNames
    .join('.')
    .split('/')
    .filter((path) => !path.includes('README'))
    .join('/')
    .replaceAll('-', ' ')
}
