import app from './app'
import envConfig from './config'
import { connect } from './database/db.functions'
import logger from './utils/logger.utils'

const PORT = envConfig.PORT || 8080

const server = app.listen(PORT, () => {
  connect().then(() => {
    logger.info(`Server is up and running on port ${PORT}`)
    logger.info('Connected to database')
  })
})

server.on('error', error => {
  logger.error(`Error: ${error}`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
