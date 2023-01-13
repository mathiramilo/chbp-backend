import dotenv from 'dotenv'
dotenv.config()

const envConfig = {
  PORT: process.env.PORT || 8080,

  MONGO_URI: process.env.MONGO_URI,

  ADMIN: process.env.ADMIN || false,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE
}

export default envConfig
