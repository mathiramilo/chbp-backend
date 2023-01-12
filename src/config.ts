import dotenv from 'dotenv'
dotenv.config()

const envConfig = {
  PORT: process.env.PORT || 8080,
  ADMIN: process.env.ADMIN || false,
  MONGO_URI: process.env.MONGO_URI
}

export default envConfig
