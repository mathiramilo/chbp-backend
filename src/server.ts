import app from './app'
import envConfig from './config/env.config'
import { connect } from './db/functions.db'
import logger from './utils/logger.utils'

const server = app.listen(envConfig.PORT, () => {
  connect().then(() => {
    logger.info(`Server is up and running on port ${envConfig.PORT}`)
    logger.info('Connected to database')
  })
})

server.on('error', (error) => {
  logger.error(`Error: ${error}`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
