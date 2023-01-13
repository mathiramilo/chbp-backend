import { Router } from 'express'
import adminMiddleware from '../../middlewares/admin.middleware'
import productsController from '../../controllers/products.controller'

const router = Router()

router.get('/', productsController.getProducts)
router.get('/:id', productsController.getProductById)
router.post('/', adminMiddleware, productsController.saveProduct)
router.put('/:id', adminMiddleware, productsController.updateProduct)
router.delete('/:id', adminMiddleware, productsController.deleteProduct)

export default router
