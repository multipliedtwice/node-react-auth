import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchAPI, isLikelyAuthorized } from '../../helpers'

type NewPasswordFunction = () => {
  signup: (
    email: string,
    password: string,
    repeat_password: string
  ) => Promise<void>
  extras: [boolean, string]
}

const useNewPassword: NewPasswordFunction = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  async function signup(
    email: string,
    password: string,
    repeat_password: string
  ) {
    setLoading(true)
    const language = localStorage
      .getItem('i18nextLng')
      ?.substring(0, 2)
      ?.toLowerCase()
    setLoading(true)

    fetchAPI({
      url: 'signup',
      method: 'POST',
      data: {
        user: {
          email,
          password,
          repeat_password,
          ...(language && language != 'undefined'
            ? { language }
            : { language: 'en' }),
        },
      },
    })
      .then(({ data }) => {
        const {
          user: { token, expires_in },
        } = data
        if (token) {
          localStorage.setItem('token', token)
          localStorage.setItem('expires_in', expires_in)
        }

        if (isLikelyAuthorized()) history?.push('/profile')
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    signup,
    extras: [loading, error],
  }
}

export { useNewPassword }
