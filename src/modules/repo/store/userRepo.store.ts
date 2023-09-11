import { defineStore } from 'pinia'

import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
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
  isReadmeOffline: boolean
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
    isReadmeOffline: true,
    readme: undefined,
    userSettings: undefined,
    needToLogin: false
  }),
  actions: {
    async setUserRepo(user: string, repo: string) {
      this.isReadmeOffline = true
      this.user = user
      this.repo = repo

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
        .then((files) => {
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

      getCachedMainReadme(user, repo)
        .then((readme) => {
          this.readme = readme
        })
        .then(() => getMainReadme(user, repo))
        .then((readme) => {
          this.readme = readme

          // if the offline state is too fast,
          // it gives an impression of glitch.
          setTimeout(() => {
            this.isReadmeOffline = false
          }, 350)
        })
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
