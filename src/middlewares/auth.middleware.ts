import jwt from 'jsonwebtoken'
import envConfig from '../config'
import { HTTP_STATUS } from '../constants/api.constants'
import UsersDAO from '../models/daos/users.dao'
import { HttpError } from '../utils/api.utils'

const usersDAO = new UsersDAO()

const authMiddleware = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new HttpError(
        HTTP_STATUS.UNAUTHORIZED,
        'Not authorized to access this route'
      )
    )
  }

  try {
    // Verify token
    const decoded: any = jwt.verify(token, envConfig.JWT_SECRET)

    const user = await usersDAO.getById(decoded.id)

    if (!user) {
      return next(
        new HttpError(HTTP_STATUS.NOT_FOUND, 'No user found with this id')
      )
    }

    req.user = user
    next()
  } catch (error) {
    return next(
      new HttpError(
        HTTP_STATUS.UNAUTHORIZED,
        'Not authorized to access this route'
      )
    )
  }
}

export default authMiddleware
