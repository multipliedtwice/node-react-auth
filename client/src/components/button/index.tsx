import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader } from '../loader'

interface Props {
  isDisabled?: boolean
  isRequesting?: boolean
  marginx?: number
  label?: string
  className?: string
  width?: string
  color?: Templates
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
}
type Templates = 'secondary' | 'transparent' | 'white' | 'primary'

function colorScheme(color: Templates): string {
  const templates = {
    primary:
      'bg-blue-500 border border-blue-500 hover:bg-blue-700 active:bg-blue-900 hover:border-blue-700 active:border-blue-900 text-white px-2',
    transparent: 'bg-transparent border hover:border-white text-white px-2',
    secondary:
      'text-center bg-transparent border border-blue-500 text-blue-500 text-2xl px-2 py-3 rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none',
    white:
      'bg-white shadow text-grey-700 rounded-lg py-3 px-2 hover:bg-blue-100 focus:outline-none active:bg-grey-400 whitespace-no-wrap',
  }

  return templates[color]
}

const Button: FunctionComponent<Props> = ({
  isRequesting,
  marginx = 3,
  label = 'Send',
  type = 'button',
  className,
  width = '',
  color = 'primary',
  onClick,
  isDisabled,
}) => {
  const { t } = useTranslation()
  const classConstructor = `${width} ${className}`

  return (
    <button
      disabled={isDisabled || isRequesting}
      onClick={onClick}
      type={type}
      className={`flex justify-center items-center whitespace-no-wrap 
      transition text-center text-2xl py-3 rounded-lg 
      focus:outline-none h-14 w-full max-w-xs pr-4
      mx-${marginx}
      ${colorScheme(color)}
      ${classConstructor}`}
    >
      {!isRequesting && t(label)}
      {isRequesting && <Loader />}
    </button>
  )
}

export { Button }
