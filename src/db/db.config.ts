import envConfig from '../config'

const dbConfig = {
  mongodb: {
    uri: envConfig.MONGO_URI
  }
}

export default dbConfig
