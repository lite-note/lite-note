import { noteEventBus } from '@/bus/noteBusEvent'
import { onUnmounted } from '@vue/runtime-core'

const LINKS = ['http://', 'https://']

export const useLinks = (className: string, sha?: string) => {
  const linkNote: EventListener = (event) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    const href = target.getAttribute('href')

    if (!href) {
      return
    }

    if (LINKS.some((link) => href.startsWith(link))) {
      window.open(href, '_blank')
      return
    }

    noteEventBus.emit({
      path: href,
      currentNoteSHA: sha
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

      const isExternalLink = LINKS.some((link) => href.startsWith(link))

      if (isExternalLink) {
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
