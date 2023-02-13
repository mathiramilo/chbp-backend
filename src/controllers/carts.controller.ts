import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError, successResponse } from '../utils/api.utils'
import {
  createCart,
  deleteCart,
  getProductsFromCart,
  saveProductToCart,
  deleteProductFromCart,
  decreaseProductFromCart,
  checkout
} from '../services/carts.services'

class CartsController {
  async createCart(req, res, next) {
    try {
      const newCart = await createCart()
      const response = successResponse(newCart)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params
    try {
      const deletedCart = await deleteCart(id)
      const response = successResponse(deletedCart)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProducts(req, res, next) {
    const { id } = req.params
    try {
      const products = await getProductsFromCart(id)
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    const { cartId, prodId } = req.params
    const { size } = req.body
    try {
      const newProduct = await saveProductToCart(cartId, prodId, size)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const deletedProduct = await deleteProductFromCart(cartId, prodId)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async decreaseProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const decreasedProduct = await decreaseProductFromCart(cartId, prodId)
      const response = successResponse(decreasedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async checkout(req, res, next) {
    const { cartId } = req.params
    const { name, email, phone } = req.body

    try {
      if (!name || !email || !phone) {
        const message = 'Name, email and phone are required in the body to checkout'
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
      }

      const products = await checkout(cartId, { name, email, phone })

      const response = successResponse({
        buyer: { name, email, phone },
        products
      })
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new CartsController()
