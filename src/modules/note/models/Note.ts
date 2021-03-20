import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface Note extends Model<DataType.Note> {
  content: string
}
