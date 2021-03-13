import { createEventBus } from 'retrobus'

interface EventBusParams {
  path: string
  currentNoteSHA?: string
}

export const noteEventBus = createEventBus<EventBusParams>('note')
