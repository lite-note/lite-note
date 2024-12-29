import { Notyf } from 'notyf'

const notif = new Notyf({
  types: [
    {
      className: 'prose alert alert-success',
      type: 'confirm'
    },
    {
      className: 'prose alert alert-error',
      type: 'error'
    }
  ]
})

export const confirmMessage = (message: string) =>
  notif.open({
    type: 'confirm',
    message
  })

export const errorMessage = (message: string) =>
  notif.open({ type: 'error', message })
