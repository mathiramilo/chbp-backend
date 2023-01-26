import mongoose from 'mongoose'
import envConfig from '../config'

export const connect = async () => {
  await mongoose.connect(envConfig.MONGO_URI)
}

export const disconnect = async () => {
  await mongoose.disconnect()
}
