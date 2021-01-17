import React from 'react'

interface SelectProps {
  name: string
  value?: boolean
}

const Toggle = React.forwardRef<HTMLInputElement, SelectProps>(
  ({ name, value }, ref) => {
    return (
      <label className='group-interactive toggle w-10 h-6 flex items-center cursor-pointer relative'>
        <input
          type='checkbox'
          value={String(value)}
          defaultChecked={value}
          className='toggle hidden'
          name={name}
          ref={ref}
        />

        <span className='toggle__line absolute top-0 bottom-0 my-auto w-16 h-8 bg-gray-200 rounded-full shadow-inner dark:bg-gray-650'></span>

        <span className='toggle__dot absolute bottom-0 my-auto w-6 h-6 rounded-full shadow'></span>
      </label>
    )
  }
)
Toggle.displayName = 'Toggle'
export { Toggle }
