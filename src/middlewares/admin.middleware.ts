import envConfig from '../config'
import logger from '../utils/logger.utils'

const adminMiddleware = (req, res, next) => {
  const { url, method } = req
  const isAdmin: boolean = envConfig.ADMIN === 'true'

  if (!isAdmin) {
    logger.error('Route not authorized')
    return res.status(401).json({
      error: -1,
      description: `route ${url} method ${method} not authorized`
    })
  }

  next()
}

export default adminMiddleware
