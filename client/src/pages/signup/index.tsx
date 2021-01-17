import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { isLikelyAuthorized } from 'src/helpers'
import { Button, Input } from '../../components'
import { useNewPassword } from './hook'

const Signup: FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const {
    signup,
    extras: [loading, error],
  } = useNewPassword()

  useEffect(() => {
    if (isLikelyAuthorized()) history?.push('/profile')
  }, [])

  const onSubmit = ({
    email,
    password,
    repeat_password,
  }: {
    email: string
    password: string
    repeat_password: string
  }) => {
    signup(email, password, repeat_password)
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
        </div>
        <div className='mb-6 w-full'>
          <Input
            label={t('Confirm password')}
            type='password'
            name='repeat_password'
            placeholder='********'
            autocomplete='off'
            ref={register({ required: true })}
          />
          <div className='mt-1 text-lg'>
            {errors.repeat_password && t('Password confirmation is required')}
          </div>
        </div>
        <div className='mb-6'>{error || ''}</div>
        <Button
          isRequesting={loading}
          type='submit'
          label={t('Create new account')}
        />
        <div className='mt-6 flex w-full justify-center'>
          <Button
            onClick={() => {
              history.push('/')
            }}
            color='white'
            type='submit'
            label={t('I have an account')}
          />
        </div>
      </form>
    </div>
  )
}

export { Signup }
