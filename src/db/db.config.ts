import envConfig from '../config'
const serviceAccount = require('./firebase/firebase.config.json')

const dbConfig = {
  mongodb: {
    uri: envConfig.MONGO_URI
  },
  firebase: {
    credentials: serviceAccount
  }
}

export default dbConfig
