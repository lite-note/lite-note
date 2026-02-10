export const getUrl = async ({ did, rkey }: { did: string; rkey: string }) => {
  const response = await fetch(`https://plc.directory/${did}`)
  const {
    service: [{ serviceEndpoint }],
  } = await response.json()

  const url = new URL("/xrpc/com.atproto.repo.getRecord", serviceEndpoint)
  url.searchParams.set("repo", did)
  url.searchParams.set("collection", "space.litenote.note")
  url.searchParams.set("rkey", rkey)

  return url.toString()
}
