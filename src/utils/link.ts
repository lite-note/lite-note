export const LINKS = ['http://', 'https://']

export const isExternalLink = (href: string) =>
  LINKS.some((link) => href.startsWith(link))
