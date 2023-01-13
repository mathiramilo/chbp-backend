import MongoContainer from '../containers/mongo.container'
import productSchema from '../schemas/product.schema'

const collection = 'products'

class ProductsDAO extends MongoContainer {
  constructor() {
    super(collection, productSchema)
  }
}

export default ProductsDAO
