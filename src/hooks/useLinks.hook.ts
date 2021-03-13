export const useLinks = (className: string) => {
  const linkNote: EventListenerOrEventListenerObject = (e) => {
    e.preventDefault()
    console.log('use links')
  }

  const selector = `.${className} a`

  const removeListeners = () => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      element.removeEventListener('click', linkNote)
    })
  }

  const listenToClick = () => {
    removeListeners()
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      element.addEventListener('click', linkNote)
    })
  }

  return {
    listenToClick,
    removeListeners
  }
}
