import { defineStore } from 'pinia'

import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
import { SavedRepo } from '@/modules/repo/models/SavedRepo'
import {
  getCachedMainReadme,
  getFiles,
  getMainReadme,
  getUserSettingsContent
} from '@/modules/repo/services/repo'
import { refreshToken } from '@/modules/user/service/signIn'

interface State {
  user: string
  repo: string
  files: RepoFile[]
  readme?: string | null
  userSettings?: UserSettings | null
  needToLogin: boolean
}

export const useUserRepoStore = defineStore({
  id: 'USER_REPO_STATE',
  state: (): State => ({
    user: '',
    repo: '',
    files: [],
    readme: undefined,
    userSettings: undefined,
    needToLogin: false
  }),
  actions: {
    async setUserRepo(user: string, repo: string) {
      this.user = user
      this.repo = repo

      const savedRepoId = data.generateId(DataType.SavedRepo, `${user}-${repo}`)
      const cachedSavedRepo = await data.get<DataType.SavedRepo, SavedRepo>(
        savedRepoId
      )

      if (cachedSavedRepo) {
        this.files = cachedSavedRepo.files
      }

      try {
        await refreshToken()
      } catch (error) {
        console.warn('impossible to refresh token')
      }

      const userSettingsId = `UserSetting-${user}-${repo}`
      const cachedUserSettings = await data.get<
        DataType.UserSettings,
        UserSettings
      >(userSettingsId)

      if (cachedUserSettings) {
        this.userSettings = cachedUserSettings
      }

      getFiles(user, repo)
        .then(async (files) => {
          data.update<DataType.SavedRepo, SavedRepo>({
            _id: savedRepoId,
            $type: DataType.SavedRepo,
            repo,
            user,
            files
          })
          this.files = files
          return getUserSettingsContent(user, repo, files)
        })
        .then((userSettings) => {
          this.userSettings = userSettings

          if (userSettings) {
            data.update<DataType.UserSettings, UserSettings>({
              ...userSettings,
              _id: userSettingsId
            })
          }
        })

      getCachedMainReadme(user, repo).then(async (cachedReadme) => {
        this.readme = cachedReadme
        this.readme = await getMainReadme(user, repo)
      })
    },
    addFile(file: RepoFile) {
      const savedRepoId = data.generateId(
        DataType.SavedRepo,
        `${this.user}-${this.repo}`
      )
      const newFiles = [...this.files.filter((f) => f.sha !== file.sha), file]
      data.update<DataType.SavedRepo, SavedRepo>({
        _id: savedRepoId,
        $type: DataType.SavedRepo,
        repo: this.repo,
        user: this.user,
        files: newFiles
      })
      this.files = newFiles
    },
    resetUserRepo() {
      this.user = ''
      this.repo = ''
      this.resetFiles()
    },
    resetFiles() {
      this.files = []
      this.readme = null
      this.userSettings = undefined
    }
  }
})
