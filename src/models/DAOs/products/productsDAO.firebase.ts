import FirebaseContainer from '../../containers/firebase.container'

const collection = 'products'

class ProductsFirebaseDAO extends FirebaseContainer {
  constructor() {
    super(collection)
  }
}

export default ProductsFirebaseDAO
