import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '../../types/types'
import { HTTP_STATUS } from '../../constants/api.constants'
import { HttpError } from '../../utils/api.utils'

class ProductsContainer {
  constructor() {}

  save = async (product: Product) => {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = 'Wrong body format: incorrect types'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const products = await this.getAll()
    const newProduct = {
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
      ...product
    }

    products.push(newProduct)
    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/products.json'),
      JSON.stringify(products)
    )
    return newProduct
  }

  updateById = async (id, product: Product) => {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = 'Wrong body format: incorrect types'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const products = await this.getAll()
    const productIndex = products.findIndex(prod => prod.id === id)

    if (productIndex < 0) {
      const message = `Product with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    const updatedProduct = {
      ...products[productIndex],
      name,
      description,
      code,
      imgUrl,
      price,
      stock
    }
    products[productIndex] = updatedProduct
    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/products.json'),
      JSON.stringify(products)
    )
    return updatedProduct
  }

  getById = async (id: string): Promise<Product> => {
    const products = await this.getAll()
    const product = products.find(prod => prod.id === id)
    
    if (!product) {
      const message = `Product with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return product
  }

  getAll = async (): Promise<Product[]> => {
    const content = await fs.promises.readFile(
      path.resolve(__dirname, '../data/products.json'),
      'utf-8'
    )
    const products = JSON.parse(content || '[]')
    return products
  }

  deleteById = async (id: string) => {
    const allProducts = await this.getAll()
    const productToDelete = allProducts.find(prod => prod.id === id)

    if (!productToDelete) {
      const message = `Product with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    const newProducts = allProducts.filter(prod => prod.id !== id)
    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/products.json'),
      JSON.stringify(newProducts)
    )
    return productToDelete
  }
}

export default ProductsContainer
