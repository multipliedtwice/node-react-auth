import * as React from 'react'
import { useTranslation } from 'react-i18next'

// ------------------------------------
// Reusable input field
// ------------------------------------

interface InputProps {
  value?: string
  minLength?: number
  maxLength?: number
  showError?: boolean
  flag?: string
  label?: string
  name?: string
  type?: string
  placeholder?: string
  autoFocus?: boolean
  isDisabled?: boolean
  inputClass?: string
  id?: string
  autocomplete?: string
}
// : React.FC<InputProps>
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { t } = useTranslation()

  const {
    minLength,
    maxLength,
    name,
    label = t('Please specify label'),
    type = 'text',
    autoFocus,
    isDisabled = false,
    inputClass,
    id,
    placeholder,
    autocomplete,
  } = props

  return (
    <>
      <label className='relative flex flex-col'>
        <span className='flex whitespace-no-wrap mb-2 text-lg'>{label}</span>

        <span className='flex w-full relative'>
          <input
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            name={name}
            tabIndex={0}
            autoFocus={autoFocus}
            autoComplete={autocomplete}
            className={`w-full focus:outline-none focus:border-sky-500 bg-white p-3 
            text-2xl round-lg block border rounded-lg ${inputClass || ''}`}
            disabled={isDisabled}
            id={id}
            ref={ref}
          />
        </span>
      </label>
    </>
  )
})

Input.displayName = 'Input'
export { Input }
