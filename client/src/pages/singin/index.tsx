import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { isLikelyAuthorized } from 'src/helpers'
import { Button, Input } from '../../components'
import { useNewPassword } from './hook'

const Signin: FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const {
    signIn,
    extras: [loading, error],
  } = useNewPassword()

  useEffect(() => {
    if (isLikelyAuthorized()) history?.push('/profile')
  }, [])

  const onSubmit = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    signIn(email, password)
  }

  return (
    <div className='flex flex-col w-4/12'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-xl flex flex-col items-center p-20'
      >
        <div className='mb-6 w-full'>
          <Input
            label={t('Email')}
            placeholder='user@example.com'
            name='email'
            autoFocus={true}
            autocomplete='email'
            ref={register({ required: true })}
          />
          <div className='mt-1 text-lg'>
            {errors.email && t('Email is required')}
          </div>
        </div>
        <div className='mb-6 w-full'>
          <Input
            label={t('Password')}
            type='password'
            name='password'
            placeholder='********'
            autocomplete='current-password'
            ref={register({ required: true })}
          />
          <div className='mt-1 text-lg'>
            {errors.password && t('Password is required')}
          </div>

          <div className='mb-6'>{error || ''}</div>
        </div>
        <Button isRequesting={loading} type='submit' label={t('Login')} />
        <div className='mt-6 flex w-full justify-center'>
          <Button
            onClick={() => {
              history.push('/signup')
            }}
            color='white'
            type='submit'
            label={t('Create new account')}
          />
        </div>
      </form>
    </div>
  )
}

export { Signin }
