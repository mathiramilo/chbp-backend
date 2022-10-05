import express from 'express'
import logger from './middlewares/logger'
import apiRoutes from './routes/routes'

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)

app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  const { url, method } = req
  res.status(404).json({ 
    error: -2,
    description: `route ${url} method ${method} not implemented`
  })
})

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
