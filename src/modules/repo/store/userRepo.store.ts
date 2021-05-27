import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { UserSettings } from '@/modules/repo/interfaces/UserSettings'
import {
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
      await refreshToken()
      const [readme, files] = await Promise.all([
        getMainReadme(newUser, newRepo),
        getFiles(newUser, newRepo)
      ])
      this.userSettings = await getUserSettingsContent(newUser, newRepo, files)

      this.readme = readme
      this.files = files
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
