import app from './app'
import envConfig from './config'
import MongoContainer from './models/containers/mongo.container'
import FirebaseContainer from './models/containers/firebase.container'

const PORT = envConfig.PORT || 8080

const DATASOURCE_OPTIONS = {
  mongo: MongoContainer,
  firebase: FirebaseContainer,
}

const datasource = DATASOURCE_OPTIONS[envConfig.DATASOURCE]

const server = app.listen(PORT, () => {
  datasource.connect().then(() => {
    console.log(`Server is up and running on port ${PORT}`)
    console.log(`Connected to ${envConfig.DATASOURCE}`)
  })
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
