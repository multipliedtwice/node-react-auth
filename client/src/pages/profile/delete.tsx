import React from 'react'
import { useTranslation } from 'react-i18next'
import { fetchAPI } from '../../helpers'
import { Button, Modal } from '../../components'
import { useHistory } from 'react-router-dom'

type ModalProps = {
  isShowing: boolean
  toggle: () => void
}
const DeleteUser: React.FC<ModalProps> = ({ isShowing, toggle }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const deleteUser = () => {
    fetchAPI({ url: 'profile', method: 'DELETE' })
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('expires_in')
        history.push('/')
      })
      .catch((err) => console.log('err :>> ', err))
  }
  return (
    <Modal isShowing={isShowing} toggle={toggle} widthClass='w-4/12'>
      <>
        <div className='container mx-auto my-10 w-full'>
          <div className='flex flex-col items-center text-2xl bg-white p-10 text-grey-900 text-center'>
            <h4 className='mb-6'>{t('Do you want to delete account')}</h4>
            <div className='flex w-full'>
              <Button onClick={toggle} color='secondary' label={t('Cancel')} />
              <Button
                onClick={deleteUser}
                color='primary'
                label={t('Delete user')}
              />
            </div>
          </div>
        </div>
      </>
    </Modal>
  )
}

export { DeleteUser }
