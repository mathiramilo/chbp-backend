import { HTTP_STATUS } from '../../../constants/api.constants'
import { Product } from '../../../types/types'
import { HttpError } from '../../../utils/api.utils'
import FirebaseContainer from '../../containers/firebase.container'

const collection = 'products'

class ProductsFirebaseDAO extends FirebaseContainer {
  constructor() {
    super(collection)
  }

  async save(product) {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = 'Wrong body format: incorrect types'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const docRef = this.collection.doc()
    return await docRef.set({
      timestamp: new Date().toLocaleString(),
      ...product
    })
  }

  async update(id, product: Product) {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = 'Wrong body format: incorrect types'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const docRef = this.collection.doc(id)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update(product)
  }
}

export default ProductsFirebaseDAO
