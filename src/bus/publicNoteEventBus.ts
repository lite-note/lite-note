import { createEventBus } from "retrobus"

interface EventBusParams {
  path: string
  currentNoteRkey?: string
}

export const publicNoteEventBus = createEventBus<EventBusParams>()
