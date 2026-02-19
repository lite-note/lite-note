import { ComputedRef, onUnmounted, Ref, toValue } from "vue"

import { isExternalLink } from "@/utils/link"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { parseAtUri } from "@/modules/atproto/parseAtUri"

export const useATProtoLinks = (
  className: ComputedRef<string> | string,
  currentAtUri?: Ref<string> | string,
) => {
  const { addStackedNote } = useRouteQueryStackedNotes()
  const linkNote = (event: Event) => {
    const target = event.target as HTMLElement
    const atUri = target.getAttribute("href")

    if (!atUri) {
      return
    }

    if (atUri.startsWith("#")) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (isExternalLink(atUri)) {
      window.open(atUri, "_blank")
      return
    }
    const { rkey } = parseAtUri(atUri)

    addStackedNote(toValue(currentAtUri) ?? "", atUri, rkey)
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
