import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface UserSettings extends Model<DataType.UserSettings> {
  fontFamily?:
    | 'Courgette'
    | 'IBM Plex Serif'
    | 'Kiwi Maru'
    | 'Maven Pro'
    | 'Noto Sans KR'
    | 'Tajawal'
    | 'Domine'
  mode?: 'light' | 'dark'
  backlink?: boolean
}
