import { readonly, ref } from '@vue/reactivity'

import { useRoute } from 'vue-router'

const stackedNotes = ref<string[]>([])

let initial = true

export const useQueryStackedNotes = () => {
  const { query } = useRoute()

  const setStackedNotes = () => {
    stackedNotes.value = (Array.isArray(query.stackedNotes)
      ? query.stackedNotes
      : [query.stackedNotes]
    )
      .map((n) => n?.toString())
      .filter((n) => !!n) as string[]
  }

  if (initial) {
    initial = false
    setStackedNotes()
  }

  return {
    stackedNotes: readonly(stackedNotes),
    updateQueryStackedNotes: (newStackedNotes: string[]) =>
      (stackedNotes.value = newStackedNotes),
    resetStackedNotes: () => (stackedNotes.value = [])
  }
}
