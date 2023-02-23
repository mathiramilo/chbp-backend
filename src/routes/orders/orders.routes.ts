import express from 'express'
import OrdersController from '../../controllers/orders.controller'
import authMiddleware from '../../middlewares/auth.middleware'
import adminMiddleware from '../../middlewares/admin.middleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', adminMiddleware, OrdersController.getOrders)
router.get('/:id', adminMiddleware, OrdersController.getOrder)
router.post('/', OrdersController.createOrder)
router.delete('/:id', adminMiddleware, OrdersController.deleteOrder)

export default router
