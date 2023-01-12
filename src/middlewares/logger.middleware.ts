import logger from '../utils/logger.utils'

const loggerMiddleware = (req, res, next) => {
  const method = req.method
  const url = req.url

  logger.info(`${method} => ${url}`)
  next()
}

export default loggerMiddleware
