import { HTTP_STATUS } from '../../constants/api.constants'
import { HttpError } from '../../utils/api.utils'
import MongoDAO from './mongo.dao'
import ProductsDAO from './products.dao'
import CartSchema from '../models/Cart'

const collection = 'carts'

class CartsDAO extends MongoDAO {
  constructor() {
    super(collection, CartSchema)
  }

  async getProducts(cartId: string) {
    const cart = await this.getById(cartId)
    return [...cart.products]
  }

  async saveProduct(cartId: string, prodId: string) {
    const product = await ProductsDAO.getById(prodId)

    const productAlreadyInCart = await this.productExistsInCart(cartId, prodId)

    let updatedCart

    if (productAlreadyInCart) {
      const cartProducts = await this.getProducts(cartId)
      const productIndex = cartProducts.findIndex(item => item.product._id.toString() === prodId)
      cartProducts[productIndex].qty++

      updatedCart = await this.model.updateOne({ _id: cartId }, { $set: { products: cartProducts } }, { new: true })
    } else {
      updatedCart = await this.model.updateOne(
        { _id: cartId },
        { $push: { products: { product, qty: 1 } } },
        { new: true }
      )
    }

    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    return updatedCart
  }

  async deleteProduct(cartId: string, prodId: string) {
    const cartProducts = await this.getProducts(cartId)
    const newCartProducts = cartProducts.filter(item => item.product._id.toString() !== prodId)
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $set: { products: newCartProducts } },
      { new: true }
    )
    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }

  async decreaseProduct(cartId: string, prodId: string) {
    const cartProducts = await this.getProducts(cartId)
    const productIndex = cartProducts.findIndex(item => item.product._id.toString() === prodId)
    const qty = cartProducts[productIndex].qty

    if (qty <= 1) {
      return await this.deleteProduct(cartId, prodId)
    }

    cartProducts[productIndex].qty--

    const updatedCart = await this.model.updateOne({ _id: cartId }, { $set: { products: cartProducts } }, { new: true })

    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    return updatedCart
  }

  async emptyCart(cartId: string) {
    const emptyCart = await this.model.updateOne({ _id: cartId }, { $set: { products: [] } }, { new: true })
    if (!emptyCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return emptyCart
  }

  async productExistsInCart(cartId: string, prodId: string) {
    const cart = await this.getById(cartId)
    const product = cart.products.find(item => item.product._id.toString() === prodId)
    if (!product) {
      return false
    }
    return true
  }
}

export default new CartsDAO()
