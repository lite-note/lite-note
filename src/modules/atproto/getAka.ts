export type Author = { alias: string; endpoint: string }

const correspondanceCache = new Map<string, Author>()

console.log({ correspondanceCache })

export const getUniqueAka = async (did: string): Promise<Author> => {
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

  return author
}

export const getAka = async (dids: Set<string>) => {
  const correspondance = await Promise.all(
    [...dids].map(async (did) => {
      if (correspondanceCache.has(did)) {
        return [did, correspondanceCache.get(did)] as [string, Author]
      }

      const response = await fetch(`https://plc.directory/${did}`)
      const {
        alsoKnownAs: [aka],
        service: [{ serviceEndpoint }],
      } = await response.json()

      const alias = aka.replace("at://", "")
      const author = { alias, endpoint: serviceEndpoint }

      correspondanceCache.set(did, author)

      return [did, author] as [string, Author]
    }),
  )

  return new Map(correspondance)
}
