import express from 'express'
import CartsController from '../../controllers/carts.controller'

const router = express.Router()

router.post('/', CartsController.createCart)
router.delete('/:id', CartsController.deleteCart)
router.get('/:id/products', CartsController.getProducts)
router.post('/:cartId/products/:prodId', CartsController.saveProduct)
router.delete('/:cartId/products/:prodId', CartsController.deleteProduct)
router.delete('/:cartId/products/decrease/:prodId', CartsController.decreaseProduct)
router.post('/:cartId/checkout', CartsController.checkout)

export default router
