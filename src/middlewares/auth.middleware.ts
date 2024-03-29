import jwt from 'jsonwebtoken'
import envConfig from '../config/env.config'
import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError } from '../utils/api.utils'
import { getUser } from '../services/users.services'

const authMiddleware = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'You must be authenticated to access this route'))
  }

  try {
    // Verify token
    const decoded: any = jwt.verify(token, envConfig.JWT_SECRET)

    const user = await getUser(decoded.id)

    if (!user) {
      return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'No user matches with the token'))
    }

    next()
  } catch (error) {
    return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'You must be authenticated to access this route'))
  }
}

export default authMiddleware
