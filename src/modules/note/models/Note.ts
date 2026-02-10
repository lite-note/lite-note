import { DataType } from "@/data/DataType.enum"
import { Model } from "@/data/models/Model"

export interface Note extends Model<DataType.Note> {
  content: string
  editedSha?: string
}

export interface PublicNoteListItem {
  did: string
  rkey: string
  title: string
  publishedAt: string
  createdAt: string
}

export interface PublicNote extends PublicNoteListItem {
  content: string
}
