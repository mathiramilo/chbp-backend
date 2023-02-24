import { Router } from 'express'
import productsRoutes from './products/products.routes'
import cartRoutes from './carts/carts.routes'
import authRoutes from './auth/auth.routes'
import ordersRoutes from './orders/orders.routes'

const router = Router()

router.use('/products', productsRoutes)
router.use('/cart', cartRoutes)
router.use('/auth', authRoutes)
router.use('/orders', ordersRoutes)

export default router
