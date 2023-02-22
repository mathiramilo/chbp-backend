import twilio from 'twilio'
import envConfig from '../config/env.config'
import logger from './logger.utils'

const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendWhatsapp = async options => {
  try {
    await twilioClient.messages.create({
      body: options.message,
      from: envConfig.TWILIO_WHATSAPP,
      to: envConfig.ADMIN_WHATSAPP
    })
  } catch (error) {
    logger.error(error)
  }
}

export default sendWhatsapp
