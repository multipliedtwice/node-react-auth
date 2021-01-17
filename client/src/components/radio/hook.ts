import { useState } from 'react'

export function useRadioButtons(name: string) {
  const [value, setState] = useState(null)

  const handleChange = (e: any) => {
    setState(e.target.value)
  }

  const inputProps = {
    name,
    type: 'radio',
    onChange: handleChange,
  }

  return [value, inputProps]
}
