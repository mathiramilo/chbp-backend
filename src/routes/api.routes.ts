import { Router } from 'express'
import productsRoutes from './products.routes'
import cartRoutes from './carts.routes'
import authRoutes from './auth.routes'
import ordersRoutes from './orders.routes'
import paymentsRoutes from './payments.routes'

const router = Router()

router.use('/products', productsRoutes)
router.use('/cart', cartRoutes)
router.use('/auth', authRoutes)
router.use('/orders', ordersRoutes)
router.use('/payments', paymentsRoutes)

export default router
