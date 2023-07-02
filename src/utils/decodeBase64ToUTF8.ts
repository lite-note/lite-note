export const decodeBase64ToUTF8 = (content: string): string => {
  return decodeURIComponent(
    atob(content)
      .split('')
      .map((char) => `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  )
}
