import express from 'express'
import productsRoutes from './products/routes'
import cartRoutes from './cart/routes'

const router = express.Router()

router.use('/products', productsRoutes)
router.use('/cart', cartRoutes)

export default router
