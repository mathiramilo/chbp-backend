import { FieldValue } from 'firebase-admin/firestore'
import { HTTP_STATUS } from '../../../constants/api.constants'
import { HttpError } from '../../../utils/api.utils'
import FirebaseContainer from '../../containers/firebase.container'
import ProductsFirebaseDAO from '../products/productsDAO.firebase'

const productsFirebaseDAO = new ProductsFirebaseDAO()

const collection = 'carts'

class CartsFirebaseDAO extends FirebaseContainer {
  constructor() {
    super(collection)
  }

  async getProducts(cartId) {
    const cart = await this.getById(cartId)
    return [...cart.products]
  }

  async saveProduct(cartId, prodId) {
    const product = await productsFirebaseDAO.getById(prodId)
    const docRef = this.collection.doc(cartId)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update({ products: FieldValue.arrayUnion(product) })
  }

  async deleteProduct(cartId, prodId) {
    const product = await productsFirebaseDAO.getById(prodId)
    const docRef = this.collection.doc(cartId)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update({ products: FieldValue.arrayRemove(product) })
  }
}

export default CartsFirebaseDAO
