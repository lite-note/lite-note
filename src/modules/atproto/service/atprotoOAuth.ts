import { BrowserOAuthClient } from '@atproto/oauth-client-browser'

const CLIENT_ID = import.meta.env.DEV
  ? 'http://localhost'
  : 'https://remanso.space/client-metadata.json'

let clientPromise: Promise<BrowserOAuthClient> | null = null

export const getOAuthClient = (): Promise<BrowserOAuthClient> => {
  if (!clientPromise) {
    clientPromise = BrowserOAuthClient.load({ clientId: CLIENT_ID })
  }
  return clientPromise
}

export const signInWithHandle = async (handle: string): Promise<void> => {
  const client = await getOAuthClient()
  await client.signInRedirect(handle, { scope: 'atproto transition:generic' })
}

export const restoreSession = async () => {
  const client = await getOAuthClient()
  const result = await client.init()
  return result?.session ?? null
}

export const sdkSignOut = async (sub: string): Promise<void> => {
  const client = await getOAuthClient()
  await client.revoke(sub)
}
