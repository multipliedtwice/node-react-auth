import React from 'react'

interface RadioProps {
  list: { value: string | boolean; label: string }[]
  name: string
}
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ list, name }, ref) => {
    return (
      <>
        <div className='flex items-center mr-4 mb-4'>
          {list.map(({ label, value }) => {
            return (
              <label key={label} className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name={name}
                  value={String(value)}
                  ref={ref}
                />
                {/* className='hidden' */}
                <span className='w-4 h-4 inline-block mr-1 rounded-full border border-grey'></span>
                {label}
              </label>
            )
          })}
        </div>
      </>
    )
  }
)

Radio.displayName = 'Select'
export { Radio }
