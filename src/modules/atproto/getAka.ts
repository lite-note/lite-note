export const getAka = async (dids: Set<string>) => {
  const correspondance = await Promise.all(
    [...dids].map(async (did) => {
      const response = await fetch(`https://plc.directory/${did}`)
      const {
        alsoKnownAs: [aka],
      } = await response.json()
      return [did, aka] as [string, string]
    }),
  )

  return new Map(correspondance)
}
