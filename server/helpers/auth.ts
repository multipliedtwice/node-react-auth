import jwt from 'jsonwebtoken'
import logger from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env

export const authenthication = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization

  if (!JWT_SECRET) throw new Error('Environment has no JWT secret')
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        const message = 'Unauthorized'
        logger.warn(message)
        res.status(401)
        res.json({
          success: false,
          message,
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    const message = 'Forbidden'
    logger.warn(message)
    res.status(403)
    res.json({
      success: false,
      message,
    })
  }
}

export const signToken = (payload, expiresIn = '1h') => {
  if (!JWT_SECRET) throw new Error('Environment has no JWT secret')

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn,
  })
}
