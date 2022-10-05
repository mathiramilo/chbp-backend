import fs from 'fs'
import path from 'path'
import { Product } from '../types/types'

class ProductsHandler {
  constructor() {}

  save = async (product: Product) => {
    try {
      const products = await this.getAll()
      products.push(product)

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/products.json'),
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  updateById = async (product: Product) => {
    try {
      const { id, name, description, code, imgUrl, price, stock } = product
      const products = await this.getAll()
      const productIndex = products.findIndex(prod => prod.id === id)

      if (productIndex < 0) return -1

      const newProduct = {
        ...products[productIndex],
        name,
        description,
        code,
        imgUrl,
        price,
        stock
      }
      products[productIndex] = newProduct
      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/products.json'),
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  getById = async (productId: string): Promise<Product> => {
    try {
      const products = await this.getAll()
      const product = products.find(prod => prod.id === productId)

      if (product) return product
      return null
    } catch (err) {
      console.log(err.message)
      return null
    }
  }

  getAll = async (): Promise<Product[]> => {
    try {
      const content = await fs.promises.readFile(
        path.resolve(__dirname, '../data/products.json'),
        'utf-8'
      )
      const products = JSON.parse(content || '[]')
      return products
    } catch (err) {
      console.log(err.message)
      return []
    }
  }

  deleteById = async (productId: string) => {
    try {
      const allProducts = await this.getAll()
      const productToDelete = allProducts.find(prod => prod.id === productId)

      if (productToDelete) {
        const newProducts = allProducts.filter(prod => prod.id !== productId)

        await fs.promises.writeFile(
          path.resolve(__dirname, '../data/products.json'),
          JSON.stringify(newProducts)
        )
      } else {
        return -1
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(path.resolve(__dirname, '../data/products.json'), '[]')
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default ProductsHandler
