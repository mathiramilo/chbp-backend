import MongoDAO from './mongo.dao'
import OrderSchema from '../schemas/order.schema'

const collection = 'orders'

class ProductsDAO extends MongoDAO {
  constructor() {
    super(collection, OrderSchema)
  }
}

export default new ProductsDAO()
