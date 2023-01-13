import twilio from 'twilio'
import envConfig from '../config'

const twilioClient = twilio(
  envConfig.TWILIO_ACCOUNT_SID,
  envConfig.TWILIO_AUTH_TOKEN
)

const sendWhatsapp = async options => {
  await twilioClient.messages.create({
    body: options.message,
    from: envConfig.TWILIO_WHATSAPP,
    to: envConfig.ADMIN_WHATSAPP
  })
}

export default sendWhatsapp
