import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError, successResponse } from '../utils/api.utils'
import { register, login } from '../services/auth.services'

class AuthController {
  async register(req, res, next) {
    const { fullName, email, password, phone } = req.body

    try {
      const user = await register(fullName, email, password, phone)
      const response = successResponse({
        user,
        token: user.getSignedJwtToken()
      })
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body

    try {
      if (!email || !password) {
        const message = 'Please enter an email and password'
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
      }

      const user = await login(email, password)

      const response = successResponse({
        user,
        token: user.getSignedJwtToken()
      })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController()
