import MongoContainer from '../containers/mongo.container'
import ProductSchema from '../models/Product'

const collection = 'products'

class ProductsDAO extends MongoContainer {
  constructor() {
    super(collection, ProductSchema)
  }
}

export default ProductsDAO
