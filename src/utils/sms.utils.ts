import twilio from 'twilio'
import envConfig from '../config'

const twilioClient = twilio(
  envConfig.TWILIO_ACCOUNT_SID,
  envConfig.TWILIO_AUTH_TOKEN
)

const sendSMS = async options => {
  await twilioClient.messages.create({
    body: options.message,
    from: envConfig.TWILIO_NUMBER,
    to: options.to
  })
}

export default sendSMS
