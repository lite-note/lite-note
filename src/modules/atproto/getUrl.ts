import { getAuthor } from "@/modules/atproto/getAuthor"

const endpointCache = new Map<string, string>()

const getEndpoint = async (did: string) => {
  if (endpointCache.has(did)) {
    return endpointCache.get(did)
  }
  const response = await fetch(`https://plc.directory/${did}`)
  const {
    service: [{ serviceEndpoint }],
  } = await response.json()

  endpointCache.set(did, serviceEndpoint)

  return serviceEndpoint as string
}

export const getUrl = async ({ did, rkey }: { did: string; rkey: string }) => {
  const author = await getAuthor(did)

  if (!author) {
    return null
  }

  const url = new URL("/xrpc/com.atproto.repo.getRecord", author.pds)
  url.searchParams.set("repo", did)
  url.searchParams.set("collection", "space.remanso.note")
  url.searchParams.set("rkey", rkey)

  return url.toString()
}
