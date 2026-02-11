const correspondanceCache = new Map<string, string>()

export const getUniqueAka = async (did: string) => {
  if (correspondanceCache.has(did)) {
    return correspondanceCache.get(did) as string
  }

  const response = await fetch(`https://plc.directory/${did}`)
  const {
    alsoKnownAs: [aka],
  } = await response.json()

  const alias = aka.replace("at://", "")

  correspondanceCache.set(did, alias)

  return alias
}

export const getAka = async (dids: Set<string>) => {
  const correspondance = await Promise.all(
    [...dids].map(async (did) => {
      if (correspondanceCache.has(did)) {
        return [did, correspondanceCache.get(did)!] as [string, string]
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
