import { createEventBus } from 'retrobus'

export const serviceWorkerBusEvent = createEventBus<void>('new-version')
