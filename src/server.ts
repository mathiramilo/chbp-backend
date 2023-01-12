import app from './app'
import envConfig from './config'
import MongoContainer from './models/containers/mongo.container'

const PORT = envConfig.PORT || 8080

const server = app.listen(PORT, () => {
  MongoContainer.connect().then(() => {
    console.log(`Server is up and running on port ${PORT}`)
    console.log('Connected to MongoDB')
  })
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
