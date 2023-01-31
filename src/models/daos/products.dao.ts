import MongoDAO from './mongo.dao'
import ProductSchema from '../schemas/product.schema'

const collection = 'products'

class ProductsDAO extends MongoDAO {
  constructor() {
    super(collection, ProductSchema)
  }
}

export default new ProductsDAO()
