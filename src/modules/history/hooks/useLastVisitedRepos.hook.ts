import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { History } from '@/data/models/History'
import { useAsyncState } from '@vueuse/core'
import { computed } from 'vue'

export const useLastVisitedRepos = () => {
  const history = useAsyncState(
    data.get<DataType.History, History>(
      data.generateId(DataType.History, 'history')
    ),
    null
  )

  const lastVisitedRepos = computed(() => history.state.value?.repos ?? [])

  return {
    lastVisitedRepos
  }
}
