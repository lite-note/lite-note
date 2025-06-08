import { useWindowSize } from "@vueuse/core"
import { useRouteQuery } from "@vueuse/router"
import { nextTick, readonly } from "vue"

import { NOTE_WIDTH } from "@/constants/note-width"
import { useOverlay } from "@/hooks/useOverlay.hook"

export const useRouteQueryStackedNotes = () => {
  const stackedNotes = useRouteQuery("stackedNotes", undefined, {
    transform: (value: string | string[] | undefined) => {
      if (!value) {
        return []
      }

      return Array.isArray(value) ? value : [value]
    },
  })
  const { height } = useWindowSize()

  const { scrollToNote, isMobile } = useOverlay(false)

  const scrollToFocusedNote = (
    sha: string,
    notes: string[] = stackedNotes.value,
  ) => {
    nextTick(() => {
      const index = notes.findIndex((noteSHA) => noteSHA === sha)

      if (isMobile.value) {
        const element = document.querySelector(`.note-${sha}`) as HTMLElement
        const top = (index + 1) * (element?.clientHeight ?? height.value)
        scrollToNote(top)
      } else {
        const margin = index * 44
        const left = (index + 1) * NOTE_WIDTH - margin
        scrollToNote(left)
      }
    })
  }

  const addStackedNote = (currentSha: string, sha: string) => {
    if (stackedNotes.value.includes(sha)) {
      scrollToFocusedNote(sha)
      return
    }

    if (!currentSha) {
      stackedNotes.value = [sha]
    } else {
      const [splittedStackedNotes] = stackedNotes.value
        .join(";")
        .split(currentSha)

      const newStackedNotes = [
        ...splittedStackedNotes.replaceAll(";;", ";").split(";"),
        currentSha,
        sha,
      ].filter((sha) => !!sha)

      stackedNotes.value = newStackedNotes
    }

    scrollToFocusedNote(sha, stackedNotes.value)
  }

  return {
    stackedNotes: readonly(stackedNotes),
    addStackedNote,
    scrollToFocusedNote,
  }
}
