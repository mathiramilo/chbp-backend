import { Router } from 'express'
import adminMiddleware from '../../middlewares/admin.middleware'
import ProductsController from '../../controllers/products.controller'

const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:id', ProductsController.getProductById)
router.post('/', adminMiddleware, ProductsController.saveProduct)
router.put('/:id', adminMiddleware, ProductsController.updateProduct)
router.delete('/:id', adminMiddleware, ProductsController.deleteProduct)

export default router
