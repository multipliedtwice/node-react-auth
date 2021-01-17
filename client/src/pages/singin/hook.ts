import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchAPI, isLikelyAuthorized } from '../../helpers'

type NewPasswordFunction = () => {
  signIn: (email: string, password: string) => Promise<void>
  extras: [boolean, string]
}

const useNewPassword: NewPasswordFunction = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  async function signIn(email: string, password: string) {
    setLoading(true)
    fetchAPI({
      url: 'signin',
      method: 'POST',
      data: { credentials: { email, password } },
    })
      .then(({ data }) => {
        const { token, expires_in } = data

        if (token) {
          localStorage.setItem('token', token)
          localStorage.setItem('expires_in', expires_in)
        }

        if (isLikelyAuthorized()) history?.push('/profile')
      })
      .catch((error) => {
        setError(error.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    signIn,
    extras: [loading, error],
  }
}

export { useNewPassword }
