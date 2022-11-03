import express from 'express'
import logger from './middlewares/logger'
import errorMiddleware from './middlewares/error'
import apiRoutes from './routes/app.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  const { url, method } = req
  res.status(404).json({ 
    error: -2,
    description: `route ${url} method ${method} not implemented`
  })
})

app.use(errorMiddleware)

export default app
