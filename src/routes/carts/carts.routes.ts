import express from 'express'
import CartsController from '../../controllers/carts.controller'
import authMiddleware from '../../middlewares/auth.middleware'
import adminMiddleware from '../../middlewares/admin.middleware'

const router = express.Router()

router.use(authMiddleware)

router.post('/', adminMiddleware, CartsController.createCart)
router.delete('/:id', adminMiddleware, CartsController.deleteCart)
router.get('/:id/products', CartsController.getProducts)
router.post('/:cartId/products/:prodId', CartsController.saveProduct)
router.delete('/:cartId/products/:prodId', CartsController.deleteProduct)
router.put('/:cartId/products/:prodId/decrease', CartsController.decreaseProduct)
router.post('/:cartId/checkout', CartsController.checkout)

export default router
