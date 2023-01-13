import MongoContainer from '../containers/mongo.container'
import ProductSchema from '../schemas/Product.schema'

const collection = 'products'

class ProductsDAO extends MongoContainer {
  constructor() {
    super(collection, ProductSchema)
  }
}

export default ProductsDAO
