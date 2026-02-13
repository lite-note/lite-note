type Author = { alias: string; endpoint: string }

const correspondanceCache = new Map<string, Author>()

export const getUniqueAka = async (did: string): Promise<Author> => {
  console.log(correspondanceCache)
  if (correspondanceCache.has(did)) {
    return correspondanceCache.get(did) as Author
  }

  const response = await fetch(`https://plc.directory/${did}`)
  const {
    alsoKnownAs: [aka],
    service: [{ serviceEndpoint }],
  } = await response.json()

  const alias = aka.replace("at://", "")
  const author = { alias, endpoint: serviceEndpoint }

  correspondanceCache.set(did, author)
  console.log(correspondanceCache)

  return author
}

export const getAka = async (dids: Set<string>) => {
  const correspondance = await Promise.all(
    [...dids].map(async (did) => {
      if (correspondanceCache.has(did)) {
        return [did, correspondanceCache.get(did)?.alias] as [string, string]
      }

      const response = await fetch(`https://plc.directory/${did}`)
      const {
        alsoKnownAs: [aka],
      } = await response.json()

      const alias = aka.replace("at://", "")

      correspondanceCache.set(did, alias)

      return [did, alias] as [string, string]
    }),
  )

  return new Map(correspondance)
}
