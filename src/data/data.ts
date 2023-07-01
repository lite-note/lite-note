import { DataType } from './DataType.enum'
import { Model } from './models/Model'
import PouchDb from 'pouchdb-browser'
import indexedDb from 'pouchdb-adapter-indexeddb'
import { nanoid } from 'nanoid'

PouchDb.plugin(indexedDb)

interface GetAllParams {
  prefix?: string
  includeDocs?: boolean
  includeAttachments?: boolean
  keys?: string[]
}

class Data {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly locale: PouchDB.Database<{}> | null = null

  constructor() {
    try {
      this.locale = new PouchDb('lite-note', {
        adapter: 'indexeddb'
      })
    } catch (error) {
      console.warn('data error', error)
    }
  }

  public async add<DT extends DataType>(model: Model<DT>): Promise<boolean> {
    try {
      const result = await this.locale?.put(model)
      return result?.ok ?? false
    } catch (error) {
      console.warn(error)

      return false
    }
  }

  public async update<DT extends DataType>(model: Model<DT>): Promise<boolean> {
    try {
      if (model._id) {
        const oldModel = await this.get(model._id)
        if (oldModel) {
          const result = await this.locale?.put({ ...oldModel, ...model })
          return result?.ok ?? false
        }
      }
      const result = await this.locale?.put(model)
      return result?.ok ?? false
    } catch (error) {
      console.warn(error)

      return false
    }
  }

  public async remove(id: string): Promise<boolean> {
    try {
      const doc = await this.get(id)
      if (!doc) {
        return false
      }
      const result = await this.locale?.put({
        ...doc,
        _deleted: true
      })
      return result?.ok ?? false
    } catch {
      return false
    }
  }

  public async get<DT extends DataType, T extends Model<DT>>(
    id: string
  ): Promise<T | null> {
    try {
      return ((await this.locale?.get(id)) as T) || null
    } catch {
      return null
    }
  }

  public async getAll<DT extends DataType, T extends Model<DT>>({
    prefix,
    includeDocs = true,
    includeAttachments = false,
    keys = []
  }: GetAllParams): Promise<T[]> {
    if (!this.locale) {
      return []
    }

    if (keys.length) {
      const response = await this.locale.allDocs({
        include_docs: includeDocs,
        attachments: includeAttachments,
        keys: keys.map((key) => this.generateId(prefix, key))
      })

      return response.rows
        .map((row) => {
          if ('error' in row) {
            return null
          }

          return row.doc
        })
        .filter((doc) => !!doc) as T[]
    }

    const response = await this.locale.allDocs({
      include_docs: includeDocs,
      attachments: includeAttachments,
      startkey: prefix ? prefix : undefined,
      endkey: prefix ? `${prefix}\ufff0` : undefined
    })

    return response.rows.map((row) => row.doc) as T[]
  }

  public generateId(type?: DataType | string, id?: string) {
    if (!type) {
      return id || nanoid()
    }

    return `${type}-${id || nanoid()}`
  }
}

export const data = new Data()
