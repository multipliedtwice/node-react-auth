import { logger } from '@config'
import { CustomRequest } from '@common-types'
import { validate, signToken } from '@helpers'
import { CreateUserInputBody, SignInUserInputBody, UserType } from './types'
import { User } from './model'
import {
  validateUserSignInInputRequest,
  validateUserSignUpInputRequest,
} from './request.joi'

export const signIn = async (
  req: CustomRequest<SignInUserInputBody>,
  res,
  next
) => {
  if (!req.body.credentials)
    return res.status(500).json({ error: 'Please provide credentials' })
  const { credentials } = req.body

  validate(validateUserSignInInputRequest, credentials, res)

  User.findOne({ email: credentials.email }, function (err, user) {
    if (!user) return res.status(400).send({ message: 'User not found.' })

    if (user.verifyPassword(credentials.password)) {
      const token = signToken({
        id: user.id,
        email: user.email,
      })
      const expires_in = new Date().setHours(new Date().getHours() + 1)

      return res.status(201).send({
        message: 'User Logged In',
        token,
        expires_in: Number(expires_in),
      })
    } else {
      return res.status(400).send({
        message: 'Wrong Password',
      })
    }
  })
}

export const getUser = (req, res, next) => {
  const { decoded } = req
  const { id } = decoded
  User.findById(id)
    // @ts-ignore
    .then((result) => {
      const { email, isPublic, language } = result as UserType
      res.json({
        success: true,
        item: {
          email,
          isPublic,
          language,
        },
      })
    })
    .catch((error) => {
      next(new Error(error))
    })
}

export const updateUser = (req, res, next) => {
  if (!req.body.update)
    return res.status(500).json({ error: 'Please provide update data' })
  const {
    decoded,
    body: { update },
  } = req

  const { id } = decoded
  User.findOneAndUpdate({ _id: id }, update, { runValidators: true })
    .then((result) => {
      const { email, isPublic, language } = result as UserType
      res.json({
        success: true,
        item: {
          email,
          isPublic,
          language,
        },
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error: String(error),
      })
    })
}

export const createUser = async (
  req: CustomRequest<CreateUserInputBody>,
  res,
  next
) => {
  if (!req.body.user)
    return res.status(500).json({ error: 'User can not be empty' })
  const { user } = req.body

  validate(validateUserSignUpInputRequest, user, res)

  const newUser = new User(user)
  const expires_in = new Date().setHours(new Date().getHours() + 1)
  newUser
    .save()
    .then((created) => {
      logger.info(`User`)
      const token = signToken({
        id: created.id,
      })
      return res.status(201).json({
        success: true,
        user: {
          ...created,
          token,
          expires_in,
        },
      })
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.code === 11000 ? 'User already exists' : 'Unknown error',
      })
    })
}

export const deleteUser = async (req, res, next) => {
  const { decoded } = req
  const { id } = decoded
  User.deleteOne({ _id: id })
    .then(({ ok }) => {
      logger.info(`Deleted`)
      if (ok) {
        return res.status(201).json({
          success: true,
        })
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error: 'Unknown error',
      })
    })
}
