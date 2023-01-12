import express from 'express'
import loggerMiddleware from './middlewares/logger.middleware'
import errorMiddleware from './middlewares/error.middleware'
import apiRoutes from './routes/api.routes'
import errorRoutes from './routes/error.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

app.use('/api', apiRoutes)
app.use(errorRoutes)

app.use(errorMiddleware)

export default app
