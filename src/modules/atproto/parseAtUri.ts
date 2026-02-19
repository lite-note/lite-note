export const parseAtUri = (atUri: string): { did: string; rkey: string } => {
  const match = atUri.match(/^at:\/\/(did:[^/]+)\/[^/]+\/(.+)$/)
  if (!match) {
    throw new Error(`Invalid AT URI: ${atUri}`)
  }
  return { did: match[1], rkey: match[2] }
}
