import { ComputedRef, onUnmounted, Ref, toValue } from "vue"

import { isExternalLink } from "@/utils/link"
import { useRouteQueryStackedNotes } from "@/hooks/useRouteQueryStackedNotes.hook"
import { parseAtUri } from "@/modules/atproto/parseAtUri"
import { router } from "@/router/router"

export const useATProtoLinks = (
  className: ComputedRef<string> | string,
  currentAtUri?: Ref<string> | string,
) => {
  const { addStackedNote } = useRouteQueryStackedNotes()
  const linkNote = (event: Event) => {
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

    if (href.startsWith(window.location.origin)) {
      const { params } = router.resolve(
        href.replace(window.location.origin, ""),
      )

      if (!params.did || !params.rkey) {
        return
      }

      const noteId = params.slug
        ? `${params.did}-${params.rkey}-${params.slug}`
        : `${params.did}-${params.rkey}`

      addStackedNote(toValue(currentAtUri) ?? "", noteId)
      return
    }

    if (href.startsWith("at://")) {
      const { did, rkey } = parseAtUri(href)

      addStackedNote(
        toValue(currentAtUri) ?? "",
        `${did}-${rkey}`,
        `${did}-${rkey}`,
      )
    }
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
