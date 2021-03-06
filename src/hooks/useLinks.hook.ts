import { noteEventBus } from '@/bus/noteEventBus'
import { useUserRepoStore } from '@/modules/repo/store/userRepo.store'
import { isExternalLink } from '@/utils/link'
import { onUnmounted } from '@vue/runtime-core'

export const useLinks = (className: string, sha?: string) => {
  const store = useUserRepoStore()

  const linkNote: EventListener = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const target = event.target as HTMLElement
    const href = target.getAttribute('href')

    if (!href) {
      return
    }

    if (isExternalLink(href)) {
      window.open(href, '_blank')
      return
    }

    noteEventBus.emit({
      path: href,
      currentNoteSHA: sha,
      user: store.user,
      repo: store.repo
    })
  }

  const selector = `.${className} a`

  const removeListeners = () => {
    const elements = document.querySelectorAll(selector)

    elements.forEach((element) => {
      element.removeEventListener('click', linkNote)
    })
  }

  const listenToClick = () => {
    removeListeners()
    const elements = document.querySelectorAll(selector)

    elements.forEach((element) => {
      const href = element.getAttribute('href')

      if (!href) {
        return
      }

      if (isExternalLink(href)) {
        element.classList.add('external-link')
      }
    })

    elements.forEach((element) => {
      element.addEventListener('click', linkNote)
    })
  }

  onUnmounted(() => {
    removeListeners()
  })

  return {
    listenToClick
  }
}
