import { Router } from 'express'
import ProductsController from '../../controllers/products.controller'
import adminMiddleware from '../../middlewares/admin.middleware'
import authMiddleware from '../../middlewares/auth.middleware'

const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:id', ProductsController.getProductById)
router.post('/', [authMiddleware, adminMiddleware], ProductsController.saveProduct)
router.put('/:id', [authMiddleware, adminMiddleware], ProductsController.updateProduct)
router.delete('/:id', [authMiddleware, adminMiddleware], ProductsController.deleteProduct)

export default router
