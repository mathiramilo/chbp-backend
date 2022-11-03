import { HTTP_STATUS } from '../constants/api.constants'
import { successResponse } from '../utils/api.utils'
import ProductsContainer from '../models/fsProducts.container'

const productsModel = new ProductsContainer()

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await productsModel.getAll()
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params
    try {
      const product = await productsModel.getById(id)
      const response = successResponse(product)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    try {
      const newProduct = await productsModel.save(req.body)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params
    try {
      const updatedProduct = await productsModel.updateById(id, req.body)
      const response = successResponse(updatedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const deletedProduct = await productsModel.deleteById(id)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new ProductsController()
