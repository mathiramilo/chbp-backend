import { Router } from 'express'
import authMiddleware from '../../middlewares/auth'
import productsController from '../../controllers/products.controller'

const router = Router()

router.get('/', productsController.getProducts)
router.get('/:id', productsController.getProductById)
router.post('/', authMiddleware, productsController.saveProduct)
router.put('/:id', authMiddleware, productsController.updateProduct)
router.delete('/:id', authMiddleware, productsController.deleteProduct)

export default router
