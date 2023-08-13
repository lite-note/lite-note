import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
import {
  getCachedMainReadme,
  getFiles,
  getMainReadme,
  getUserSettingsContent
} from '@/modules/repo/services/repo'
import { refreshToken } from '@/modules/user/service/signIn'
import { defineStore } from 'pinia'

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
    async setUserRepo(newUser: string, newRepo: string) {
      this.user = newUser
      this.repo = newRepo
      try {
        await refreshToken()
      } catch (error) {
        console.warn('impossible to refresh token')
      }
      const [cachedReadme] = await Promise.all([
        getCachedMainReadme(newUser, newRepo)
      ])

      this.readme = cachedReadme

      const [readme, files] = await Promise.all([
        getMainReadme(newUser, newRepo),
        getFiles(newUser, newRepo)
      ])
      this.readme = readme
      this.files = files

      this.userSettings = await getUserSettingsContent(newUser, newRepo, files)
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
