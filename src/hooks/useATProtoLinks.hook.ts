import { ComputedRef, onUnmounted, Ref, toValue } from "vue"

import { isExternalLink } from "@/utils/link"
import { publicNoteEventBus } from "@/bus/publicNoteEventBus"

export const useATProtoLinks = (
  className: ComputedRef<string> | string,
  rkey?: Ref<string> | string,
) => {
  const linkNote: EventListener = (event) => {
    const target = event.target as HTMLElement
    const href = target.getAttribute("href")

    if (!href) {
      return
    }

    if (href.startsWith("#")) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (isExternalLink(href)) {
      window.open(href, "_blank")
      return
    }

    publicNoteEventBus.emit({
      path: href,
      currentNoteRkey: toValue(rkey),
    })
  }

  const LINK_SELECTOR = `.${toValue(className)} a`

  const removeListeners = () => {
    const elements = document.querySelectorAll(LINK_SELECTOR)

    elements.forEach((element) => {
      element.removeEventListener("click", linkNote)
    })
  }

  const listenToClick = () => {
    removeListeners()
    const elements = document.querySelectorAll(LINK_SELECTOR)

    elements.forEach((element) => {
      const href = element.getAttribute("href")

      if (!href) {
        return
      }

      if (isExternalLink(href)) {
        element.classList.add("external-link")
      }
    })

    elements.forEach((element) => {
      element.addEventListener("click", linkNote)
    })
  }

  onUnmounted(() => {
    removeListeners()
  })

  return {
    listenToClick,
  }
}
