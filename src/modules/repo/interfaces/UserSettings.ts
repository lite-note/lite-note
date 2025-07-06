import { DataType } from "@/data/DataType.enum"
import { Model } from "@/data/models/Model"

export interface UserSettings extends Model<DataType.UserSettings> {
  fontFamilies?: string[]
  fontFamily?: string
  chosenFontFamily?: string
  fontSize?: string
  backlink?: boolean
}
