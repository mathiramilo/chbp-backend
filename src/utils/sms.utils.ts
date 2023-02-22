import twilio from 'twilio'
import envConfig from '../config/env.config'
import logger from './logger.utils'

const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendSMS = async options => {
  try {
    await twilioClient.messages.create({
      body: options.message,
      from: envConfig.TWILIO_NUMBER,
      to: options.to
    })
  } catch (error) {
    logger.error(error)
  }
}

export default sendSMS
