import { HTTP_STATUS } from '../../../constants/api.constants'
import { HttpError } from '../../../utils/api.utils'
import MongoContainer from '../../containers/mongo.container'
import cartSchema from '../../schemas/cart.schema'
import ProductsMongoDAO from '../products/productsDAO.mongo'

const productsMongoDAO = new ProductsMongoDAO()

const collection = 'carts'

class CartsMongoDAO extends MongoContainer {
  constructor() {
    super(collection, cartSchema)
  }

  async getProducts(cartId) {
    const cart = await this.getById(cartId)
    return [...cart.products]
  }

  async saveProduct(cartId, prodId) {
    const product = await productsMongoDAO.getById(prodId)
    const updatedCart = await this.model.updateOne({ _id: cartId }, { $push: { products: product } })
    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }

  async deleteProduct(cartId, prodId) {
    const product = await productsMongoDAO.getById(prodId)
    const updatedCart = await this.model.updateOne({ _id: cartId }, { $pull: { products: product } })
    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }
}

export default CartsMongoDAO
