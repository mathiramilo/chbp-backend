import { HTTP_STATUS } from '../constants/api.constants'
import { errorResponse } from '../utils/api.utils'
import logger from '../utils/logger.utils'

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'An unexpected error ocurred'

  logger.error(message)
  return res.status(status).json(errorResponse(message))
}

export default errorMiddleware
