export const extractYouTubeId = (input: string) => {
  if (!input) {
    return null
  }

  let url: URL

  try {
    url = new URL(input)
  } catch {
    return input.trim()
  }

  const host = url.hostname.toLowerCase()
  const pathSegments = url.pathname.split("/").filter(Boolean)

  if (host.includes("youtu.be")) {
    return pathSegments[0] ?? null
  }

  if (!host.includes("youtube.com")) {
    return null
  }

  const vParam = url.searchParams.get("v")

  if (vParam) {
    return vParam
  }

  if (
    pathSegments.length >= 2 &&
    ["embed", "shorts", "live", "watch"].includes(pathSegments[0])
  ) {
    return pathSegments[1]
  }

  return null
}
