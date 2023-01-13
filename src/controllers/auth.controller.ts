import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError, successResponse } from '../utils/api.utils'
import UsersDAO from '../models/daos/users.dao'
import sendEmail from '../utils/email.utils'

const usersDAO = new UsersDAO()

class AuthController {
  async register(req, res, next) {
    const { fullName, email, password, phone } = req.body

    try {
      const user = await usersDAO.save({
        fullName,
        email,
        password,
        phone
      })

      // Email to the admin with the register details
      const emailStyles = {
        card: 'border: 1px solid #ccc; padding: 12px; margin: 10px 0px; border-radius: 8px;',
        title: 'font-size: 18px; font-weight: bold;'
      }

      const registerDetailsCard = `
        <div style="${emailStyles.card}">
          <h3>${user.fullName}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        </div>
      `

      const bodyHtml = `
        <h2 style="${emailStyles.title}">User Information</h2>
        ${registerDetailsCard}
      `

      sendEmail({
        subject: 'New User Registered',
        html: bodyHtml
      })

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

      const user = await usersDAO.getByEmail(email)

      const isMatch = await user.matchPasswords(password)

      if (!isMatch) {
        const message = 'Email or password incorrect'
        throw new HttpError(HTTP_STATUS.UNAUTHORIZED, message)
      }

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
