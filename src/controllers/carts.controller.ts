import { HTTP_STATUS } from '../constants/api.constants'
import { successResponse } from '../utils/api.utils'
import { CartsDAO } from '../models/DAOs/app.daos'

const cartsDAO = new CartsDAO()

class CartsController {
  async createCart(req, res, next) {
    try {
      const newCart = await cartsDAO.save()
      const response = successResponse(newCart)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params
    try {
      const deletedCart = await cartsDAO.delete(id)
      const response = successResponse(deletedCart)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProducts(req, res, next) {
    const { id } = req.params
    try {
      const products = await cartsDAO.getProducts(id)
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const newProduct = await cartsDAO.saveProduct(cartId, prodId)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const deletedProduct = await cartsDAO.deleteProduct(cartId, prodId)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new CartsController()
