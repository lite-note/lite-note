import { getAuthor } from "@/modules/atproto/getAuthor"

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
