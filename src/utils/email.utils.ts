import nodemailer from 'nodemailer'
import envConfig from '../config/env.config'
import logger from './logger.utils'

const sendEmail = async options => {
  nodemailer.createTestAccount(async (err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    const mailOptions = {
      from: `"CHBP Server" ${account.user}`,
      to: envConfig.ADMIN_EMAIL,
      subject: options.subject,
      html: options.html
    }

    try {
      const info = await transporter.sendMail(mailOptions)

      logger.info(`Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    } catch (error) {
      logger.error(error)
    }
  })
}

export default sendEmail
