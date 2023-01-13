import { Router } from 'express'
import productsRoutes from './products/products.routes'
import cartRoutes from './carts/carts.routes'
import authRoutes from './auth/auth.routes'

const router = Router()

router.use('/products', productsRoutes)
router.use('/cart', cartRoutes)
router.use('/auth', authRoutes)

export default router
