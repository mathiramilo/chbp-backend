import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError } from '../utils/api.utils'
import sendEmail from '../utils/email.utils'
import UsersDAO from '../models/daos/users.dao'
import { assignCartToUser } from './users.services'

export const register = async (fullName: string, email: string, password: string, phone: string) => {
  const user = await UsersDAO.save({
    fullName,
    email,
    password,
    phone
  })

  const newUser = await assignCartToUser(user._id)

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

  newUser.password = undefined
  newUser.admin = undefined
  return newUser
}

export const login = async (email: string, password: string) => {
  const user = await UsersDAO.getByEmail(email)

  const isMatch = await user.matchPasswords(password)

  if (!isMatch) {
    const message = 'Email or password incorrect'
    throw new HttpError(HTTP_STATUS.UNAUTHORIZED, message)
  }

  user.password = undefined
  user.admin = undefined
  return user
}
