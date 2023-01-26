import MongoDAO from './mongo.dao'
import ProductSchema from '../models/Product'

const collection = 'products'

class ProductsDAO extends MongoDAO {
  constructor() {
    super(collection, ProductSchema)
  }
}

export default new ProductsDAO()
