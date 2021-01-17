import { CreateUserInput, SignInUserInput } from './types'
import Joi from 'joi'

const passRegex = new RegExp('^[a-zA-Z0-9]{3,30}$')

export const validateUserSignUpInputRequest = (user: CreateUserInput) =>
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(passRegex),
    repeat_password: Joi.ref('password'),
    language: Joi.any(),
  })
    .with('password', 'repeat_password')
    .validate(user)

export const validateUserSignInInputRequest = (credentials: SignInUserInput) =>
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(passRegex),
  }).validate(credentials)
