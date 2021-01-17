import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Input, Select, Toggle, useModal } from 'src/components'
import { fetchAPI } from '../../helpers'
import { DeleteUser } from './delete'

function useForceUpdate(): () => void {
  return React.useReducer(() => ({}), {})[1] as () => void
}

export type UserLanguages = 'en' | 'fr' | 'de' | 'ja' | 'zh' | 'ko' | 'th'

type UpdateData = {
  language: UserLanguages
  isPublic: boolean
  confirm_password: string
  new_password: string
  password: string
}

type Tabs = 'general' | 'security'
const Profile: FC = () => {
  const [tab, setTab] = useState<'security' | 'general'>('general')
  const [message, setMessage] = useState('')
  const { t, i18n } = useTranslation()
  const forceUpdate = useForceUpdate()
  const history = useHistory()
  const [error, setError] = useState<string>('')
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    getValues,
  } = useForm()
  const { toggle, isShowing } = useModal()
  const onSubmit = (data: UpdateData) => {
    fetchAPI({
      method: 'POST',
      url: 'profile',
      data: { update: { ...data } },
    })
      .then(() => {
        setValue('password', '')
        setValue('new_password', '')
        setValue('confirm_password', '')
        showSuccessMessage()
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  const showSuccessMessage = () => {
    setMessage(t('Successfully updated'))
    setTimeout(() => {
      setMessage('')
    }, 1500)
  }

  const getProfile = async () => {
    fetchAPI({ url: 'profile' })
      .then(({ data }) => {
        const {
          item: { isPublic, language, email },
        } = data
        localStorage.setItem('i18nextLng', language)
        setValue('isPublic', isPublic)
        setValue('language', language)
        setValue('email', email)
        forceUpdate()
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    const language = getValues('language')
    localStorage.setItem('i18nextLng', language)
    i18n.changeLanguage(language)
    forceUpdate()
  }, [watch('language')])

  const languagesList = [
    { label: t('English'), value: 'en' },
    { label: t('German'), value: 'de' },
    { label: t('French'), value: 'fr' },
    { label: t('Japanese'), value: 'jp' },
    { label: t('Korean'), value: 'ko' },
    { label: t('Thai'), value: 'th' },
    { label: t('Chinese'), value: 'cn' },
  ]

  const getStyle = (currentTab: Tabs) =>
    tab === currentTab ? 'primary' : 'secondary'

  const tabContent = () => {
    if (tab === 'general') {
      {
        return (
          <>
            <div className='my-6 w-full px-3'>
              <Select list={languagesList} name='language' ref={register} />
            </div>
            <div className='flex mb-6 w-full px-3'>
              <div className='mr-4'>{t('Public')}</div>
              <Toggle name='isPublic' value={true} ref={register} />
            </div>
            <Button
              onClick={() => {
                toggle()
              }}
              color='secondary'
              type='reset'
              label={t('Delete user')}
            />
          </>
        )
      }
    }

    if (tab === 'security') {
      {
        return (
          <>
            <div className='my-6 w-full px-3'>
              <Input
                label={t('Current password')}
                type='password'
                name='password'
                autocomplete='current-password'
                ref={register({
                  ...(tab === 'security' && {
                    required: 'Password is required',
                    minLength: {
                      value: 3,
                      message: 'Password must have at least 3 characters',
                    },
                  }),
                })}
              />
              <div className='mt-1 text-lg'>
                {errors.password && <p>{t(errors.password.message)}</p>}
              </div>
            </div>
            <div className='mb-6 w-full px-3'>
              <Input
                label={t('New password')}
                type='password'
                name='new_password'
                autocomplete='new-password'
                ref={register({
                  ...(tab === 'security' && {
                    required: 'New password is required',
                    minLength: {
                      value: 3,
                      message: 'Password must have at least 3 characters',
                    },
                  }),
                })}
              />
              <div className='mt-1 text-lg'>
                {errors.new_password && <p>{t(errors.new_password.message)}</p>}
              </div>
            </div>
            <div className='mb-6 w-full px-3'>
              <Input
                label={t('Confirm password')}
                type='password'
                name='confirm_password'
                ref={register({
                  ...(tab === 'security' && {
                    required: 'Password confirmation is required',
                    minLength: {
                      value: 3,
                      message: 'Password must have at least 3 characters',
                    },
                    validate: (value) =>
                      value === getValues('new_password') ||
                      'The passwords do not match',
                  }),
                })}
              />
              <div className='mt-1 text-lg'>
                {errors.confirm_password && (
                  <p>{t(errors.confirm_password.message)}</p>
                )}
              </div>
            </div>
          </>
        )
      }
    }
  }

  return (
    <>
      <DeleteUser toggle={toggle} isShowing={isShowing} />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-4/12'>
        <div className='bg-white min-h-120 rounded-xl p-20  flex flex-col items-center w-full'>
          <div className='flex flex-col items-center w-full'>
            <h1 className='text-bold text-3xl mb-6'>{getValues('email')}</h1>
            <div className='flex justify-center w-full'>
              <Button
                onClick={() => {
                  setTab('general')
                }}
                color={getStyle('general')}
                label={t('General')}
              />
              <Button
                onClick={() => {
                  setTab('security')
                }}
                color={getStyle('security')}
                label={t('Security')}
              />
            </div>
          </div>
          {tabContent()}
          <div className='mt-6'>{message || ''}</div>
          <div className='mt-6'>{error || ''}</div>
        </div>
        <div className='flex justify-center w-full'>
          <div className='flex justify-between mt-12 w-10/12'>
            <Button
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('expires_in')
                history.push('/')
              }}
              color='transparent'
              type='reset'
              label={t('Logout')}
            />
            <Button color='white' type='submit' label={t('Save changes')} />
          </div>
        </div>
      </form>
    </>
  )
}

export { Profile }
