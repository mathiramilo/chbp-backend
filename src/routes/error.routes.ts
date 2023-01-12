import { Router } from 'express'
import logger from '../utils/logger.utils'

const router = Router()

router.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Route not implemented: ${method} => ${url}`)
  res.status(404).json({
    error: -2,
    description: `route ${url} method ${method} not implemented`
  })
})

export default router
