import { Dispatch, SetStateAction, useState } from 'react'

type useModalFunction = {
  isShowing: boolean
  setIsShowing: Dispatch<SetStateAction<boolean>>
  toggle: () => void
}

const useModal = (): useModalFunction => {
  const [isShowing, setIsShowing] = useState<boolean>(false)

  function toggle(): void {
    const action = isShowing ? 'remove' : 'add'
    document.body.classList[action]('overflow-hidden')
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    setIsShowing,
    toggle,
  }
}

export { useModal }
