export interface PublicNoteRecord {
  uri: string
  cid: string
  value: PublicNote
}

export interface PublicNote {
  $type: string
  title: string
  images: PublicNoteImage[]
  content: string
  createdAt: string
  publishedAt: string
  theme?: string
  fontFamily?: string
  fontSize?: string
}

export interface PublicNoteImage {
  alt: string
  image: PublicNoteBlob
}

export interface PublicNoteBlob {
  $type: string
  ref: { $link: string }
  mimeType: string
  size: number
}
