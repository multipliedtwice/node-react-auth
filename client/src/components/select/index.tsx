import React from 'react'

interface SelectProps {
  list: { value: string; label: string }[]
  name: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ list, name }, ref) => {
    return (
      <select
        name={name}
        ref={ref}
        className='w-full p-4 text-xl focus:outline-none border rounded-xl'
      >
        {list.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'
export { Select }
