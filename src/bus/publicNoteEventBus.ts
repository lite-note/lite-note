import { createEventBus } from "retrobus"

interface EventBusParams {
  atUri: string
  currentNoteRkey?: string
}

export const publicNoteEventBus = createEventBus<EventBusParams>()
