import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import PaymentsController from '../controllers/payments.controller'

const router = Router()

router.use(authMiddleware)

router.post('/create-preference', PaymentsController.createPreference)

export default router
