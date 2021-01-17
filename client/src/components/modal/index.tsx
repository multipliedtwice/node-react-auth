import * as React from 'react'
import { FunctionComponent, ReactElement } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  children: ReactElement
  isShowing: boolean | undefined
  toggle?: () => void | undefined
  widthClass?: string
  wrapperWidthClass?: string
  bg?: string
}

const Modal: FunctionComponent<ModalProps> = ({
  isShowing,
  toggle,
  children,
  bg = 'white',
  wrapperWidthClass = 'w-full',
  widthClass = 'w-full',
}) => {
  const ModalMarkup = () =>
    ReactDOM.createPortal(
      <>
        <div
          onClick={toggle}
          className='modal top-0 bottom-0 left-0 right-0 fixed inset-0 z-50 flex justify-center animated fadeIn bg-opacity-80 bg-blue-500 overflow-auto'
        >
          <div
            className={`modal-wrapper mt-20 items-center animated fadeIn inset-y-0 ${wrapperWidthClass}`}
          >
            <section
              onClick={(e) => e.stopPropagation()}
              className={`${widthClass} flex rounded-lg flex-col justify-center items-center mx-auto bg-${bg} my-10 modal-body`}
            >
              {children}
            </section>
          </div>
        </div>
      </>,
      document.body
    )
  return isShowing ? ModalMarkup() : null
}

export { Modal }
