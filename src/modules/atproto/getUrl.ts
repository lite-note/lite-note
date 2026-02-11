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
  const url = new URL(
    "/xrpc/com.atproto.repo.getRecord",
    await getEndpoint(did),
  )
  url.searchParams.set("repo", did)
  url.searchParams.set("collection", "space.litenote.note")
  url.searchParams.set("rkey", rkey)

  return url.toString()
}
