import jwt from 'jsonwebtoken'
import envConfig from '../config/env.config'
import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError } from '../utils/api.utils'

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    // Verify token
    const decoded: any = jwt.verify(token, envConfig.JWT_SECRET)

    if (!decoded.admin) {
      return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'You are not authorized to access this route'))
    }

    next()
  } catch (error) {
    return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'You are not authorized to access this route'))
  }
}

export default adminMiddleware
