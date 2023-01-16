import nodemailer from 'nodemailer'
import envConfig from '../config'
import logger from './logger.utils'

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'orrin89@ethereal.email',
      pass: 'FKdutMGEyRevz2ERtM'
    }
  })

  const mailOptions = {
    from: '"CHBP Server" orrin89@ethereal.email',
    to: envConfig.ADMIN_EMAIL,
    subject: options.subject,
    html: options.html
  }

  const info = await transporter.sendMail(mailOptions)

  logger.info(
    `Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`
  )
}

export default sendEmail
