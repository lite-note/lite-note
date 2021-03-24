import { RepoFile } from '@/modules/repo/interfaces/RepoFile'
import { getFiles, getMainReadme } from '@/modules/repo/services/repo'
import { defineStore } from 'pinia'

interface State {
  user: string
  repo: string
  files: RepoFile[]
  readme: string | null
}

export const useUserRepoStore = defineStore({
  id: 'USER_REPO_STATE',
  state: (): State => ({
    user: '',
    repo: '',
    files: [],
    readme: null
  }),
  actions: {
    async setUserRepo(newUser: string, newRepo: string) {
      this.user = newUser
      this.repo = newRepo
      const [readme, files] = await Promise.all([
        getMainReadme(newUser, newRepo),
        getFiles(newUser, newRepo)
      ])

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
    }
  }
})
