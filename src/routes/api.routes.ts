import { Router } from 'express'
import productsRoutes from './products/products.routes'
import cartRoutes from './carts/carts.routes'

const router = Router()

router.use('/products', productsRoutes)
router.use('/cart', cartRoutes)

export default router
