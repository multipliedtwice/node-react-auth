import 'module-alias/register'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connectDB } from '@config'
import morgan from 'morgan'
import { auth } from './auth'
import helmet from 'helmet'
import debug from 'debug'
import hpp from 'hpp'
import contentLength from 'express-content-length-validator'

const info = debug('info')
const MAX_CONTENT_LENGTH_ACCEPTED = 9999

const app = express()
connectDB()

app.use(cors())
app.use(contentLength.validateMax({ max: MAX_CONTENT_LENGTH_ACCEPTED }))
app.use(hpp())
app.use(helmet())

app.use(morgan('combined', { stream: { write: (msg) => info(msg) } }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(auth)

const { APP_PORT } = process.env
app.listen(APP_PORT, () => {
  console.log(`Server running at port ${APP_PORT}`)
})
