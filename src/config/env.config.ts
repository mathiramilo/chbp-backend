import dotenv from 'dotenv'
dotenv.config()

const envConfig = {
  PORT: process.env.PORT || 8080,

  MONGO_URI: process.env.MONGO_URI,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,

  MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
  MP_SUCCESS_URL: process.env.MP_SUCCESS_URL,
  MP_PENDING_URL: process.env.MP_PENDING_URL,
  MP_FAILURE_URL: process.env.MP_FAILURE_URL
}

export default envConfig
