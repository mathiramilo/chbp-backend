import envConfig from '../../config'
import ProductsMongoDAO from './products/productsDAO.mongo'
import ProductsFirebaseDAO from './products/productsDAO.firebase'
import CartsMongoDAO from './carts/cartsDAO.mongo'
import CartsFirebaseDAO from './carts/cartsDAO.firebase'

let ProductsDAO
let CartsDAO

switch (envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDAO = ProductsMongoDAO
    CartsDAO = CartsMongoDAO
    break

  case 'firebase':
    ProductsDAO = ProductsFirebaseDAO
    CartsDAO = CartsFirebaseDAO
    break 

  default:
    throw new Error('Invalid Datasource')
}

export { ProductsDAO, CartsDAO }
