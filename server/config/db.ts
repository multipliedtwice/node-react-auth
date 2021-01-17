import mongoose from 'mongoose'
import { logger } from './logger'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = () => {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)

  const { DB_HOST, DB_NAME, DB_PORT } = process.env
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

  mongoose.connect(connectionString, { useUnifiedTopology: true })

  mongoose.connection.on('open', () => {
    logger.info(`Database connected at ${connectionString}`)
  })

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected')
  })

  mongoose.connection.on('error', (err) => {
    logger.error(`Database connection error: ${err}`)
  })

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination')
      process.exit(0)
    })
  })
}
