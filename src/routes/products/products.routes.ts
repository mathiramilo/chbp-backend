import { Router } from 'express'
import ProductsController from '../../controllers/products.controller'
import adminMiddleware from '../../middlewares/admin.middleware'
import authMiddleware from '../../middlewares/auth.middleware'

const router = Router()

// router.use(authMiddleware)

router.get('/:category?', ProductsController.getProducts)
router.get('/:id', ProductsController.getProductById)
router.post('/', adminMiddleware, ProductsController.saveProduct)
router.put('/:id', adminMiddleware, ProductsController.updateProduct)
router.delete('/:id', adminMiddleware, ProductsController.deleteProduct)

export default router
