import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface PersistedModel<DT extends DataType> extends Model<DT> {
  _id: string
}
