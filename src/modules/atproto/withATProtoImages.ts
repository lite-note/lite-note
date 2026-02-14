export const withATProtoImages = (
  markdown: string,
  { endpoint, did }: { endpoint: string; did: string },
): string => {
  const imageLinkPattern = /!\[([^\]]*)\]\((bafkrei[a-z0-9]+)\)/g

  return markdown.replace(imageLinkPattern, (_, altText, cid) => {
    const imageUrl = new URL("/xrpc/com.atproto.sync.getBlob", endpoint)
    imageUrl.searchParams.set("did", did)
    imageUrl.searchParams.set("cid", cid)
    return `![${altText}](${imageUrl.toString()})`
  })
}
