import twilio from 'twilio'
import envConfig from '../config'

const twilioClient = twilio(
  envConfig.TWILIO_ACCOUNT_SID,
  envConfig.TWILIO_AUTH_TOKEN
)

const sendSMS = async (to, body) => {
  await twilioClient.messages.create({
    body,
    from: envConfig.TWILIO_NUMBER,
    to
  })
}

export default sendSMS
