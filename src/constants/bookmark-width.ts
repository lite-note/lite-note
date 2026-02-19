export const BOOKMARK_WIDTH_REM = 2

export const getBookmarkWidthPx = () =>
  BOOKMARK_WIDTH_REM *
  parseFloat(getComputedStyle(document.documentElement).fontSize)
