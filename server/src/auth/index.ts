import { authenthication } from '@helpers'
import express from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  signIn,
  updateUser,
} from './controller'

export const auth = express.Router()
auth.post('/signup', createUser)
auth.post('/signin', signIn)
auth
  .get('/profile', authenthication, getUser)
  .post('/profile', authenthication, updateUser)
  .delete('/profile', authenthication, deleteUser)
