import { backlinkEventBus } from '@/bus/backlinkEventBus'
import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { BacklinkNote } from '@/modules/note/models/BacklinkNote'
import { useAsyncState } from '@vueuse/core'
import { onUnmounted } from 'vue'

export const useBacklinks = (sha: string) => {
  const backlink = useAsyncState(
    data.get<DataType.BacklinkNote, BacklinkNote>(
      data.generateId(DataType.BacklinkNote, sha)
    ),
    null,
    {
      resetOnExecute: true
    }
  )

  const unsubscribe = backlinkEventBus.addEventBusListener(
    ({ fileSha }) => {
      if (fileSha !== sha) {
        return
      }
      backlink.execute()
    },
    {
      retro: true
    }
  )

  onUnmounted(() => unsubscribe())

  return {
    backlink
  }
}
