import fs from 'fs'
import { Product } from '../types/types'

class ProductsHandler {
  fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
  }

  save = async (product: Product) => {
    try {
      const products = await this.getAll()
      products.push(product)

      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  updateById = async (product: Product) => {
    try {
      const { id, name, price, imgUrl } = product
      const products = await this.getAll()
      const productIndex = products.findIndex(prod => prod.id === id)

      if (productIndex < 0) return -1

      const newProduct = {
        ...products[productIndex],
        name,
        price,
        imgUrl
      }
      products[productIndex] = newProduct
      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getById = async (productId: string): Promise<Product> => {
    try {
      const products = await this.getAll()
      const product = products.find(prod => prod.id === productId)

      if (product) return product
      return null
    } catch (err) {
      console.log(err.message.red)
      return null
    }
  }

  getAll = async (): Promise<Product[]> => {
    try {
      const content = await fs.promises.readFile(
        `data/${this.fileName}`,
        'utf-8'
      )
      const products = JSON.parse(content || '[]')
      return products
    } catch (err) {
      console.log(err.message.red)
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
          `data/${this.fileName}`,
          JSON.stringify(newProducts)
        )
      } else {
        return -1
      }
    } catch (err) {
      console.log(err.message.red)
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(`data/${this.fileName}`, '[]')
    } catch (err) {
      console.log(err.message.red)
    }
  }
}

export default ProductsHandler
