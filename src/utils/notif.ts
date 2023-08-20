import { Notyf } from 'notyf'

const notif = new Notyf({
  types: [
    {
      className: 'notif-success',
      type: 'confirm'
    }
  ]
})

export const confirmMessage = (message: string) =>
  notif.open({
    type: 'confirm',
    message
  })

export const errorMessage = (message: string) => notif.error(message)
