import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface GithubAccessToken extends Model<DataType.GithubAccessToken> {
  username: string
  token: string
  expiresIn: number
  refreshToken: string
  refreshTokenExpiresIn: number
}
