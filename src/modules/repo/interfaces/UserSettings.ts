import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface UserSettings extends Model<DataType.UserSettings> {
  fontFamily?: string
  mode?: 'light' | 'dark'
  backlink?: boolean
}
