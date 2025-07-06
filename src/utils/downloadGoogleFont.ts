import FontFaceObserver from "fontfaceobserver"

const assembleFontLink = (font: string) => {
  return `https://fonts.googleapis.com/css2?display=swap&family=${font.replaceAll(
    " ",
    "+",
  )}`
}

export const downloadGoogleFont = async (font: string): Promise<void> => {
  const href = assembleFontLink(font)

  // check if the href already exists
  const existingLink = document.querySelector(`link[href="${href}"]`)

  if (!existingLink) {
    const link = document.createElement("link")
    link.href = href
    link.rel = "stylesheet"

    document.head.appendChild(link)
  }

  await new FontFaceObserver(font).load()

  document.documentElement.style.setProperty("--font-family", font)
}
