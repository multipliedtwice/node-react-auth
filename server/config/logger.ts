import appRoot from 'app-root-path'
import winston from 'winston'

const generalOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/application.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.simple(),
    colorize: true,
  },
}

const accessOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/access.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File(generalOptions.file)],
  exitOnError: false, // do not exit on handled exceptions
})

export const accessLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File(accessOptions.file)],
  exitOnError: false, // do not exit on handled exceptions
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(generalOptions.console))
}
