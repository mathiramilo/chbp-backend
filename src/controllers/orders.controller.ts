import { HTTP_STATUS } from '../constants/api.constants'
import { successResponse } from '../utils/api.utils'
import { getOrders, getOrder, createOrder, deleteOrder } from '../services/orders.services'

class AuthController {
  async getOrders(req, res, next) {
    const { email } = req.query
    try {
      const orders = await getOrders(email)
      const response = successResponse({ orders })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async getOrder(req, res, next) {
    const { id } = req.params
    try {
      const order = await getOrder(id)
      const response = successResponse({ order })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async createOrder(req, res, next) {
    const order = req.body
    try {
      const newOrder = await createOrder(order)
      const response = successResponse({ newOrder })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async deleteOrder(req, res, next) {
    const { id } = req.params
    try {
      const data = await deleteOrder(id)
      const response = successResponse({ data })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
