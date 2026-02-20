export const LINKS = ["http://", "https://"]

export const isExternalLink = (href: string) =>
  !href.startsWith(window.location.origin) &&
  LINKS.some((link) => href.startsWith(link))
