import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Cart, Product } from '../types/types'

class CartsHandler {
  constructor() {}

  create = async (cart: Cart) => {
    try {
      const carts = await this.getAll()
      carts.push(cart)

      await fs.promises.writeFile(
        '../data/carts.json',
        JSON.stringify(carts)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  deleteById = async (cartId: string) => {
    try {
      const allCarts = await this.getAll()
      const cartToDelete = allCarts.find(cart => cart.id === cartId)

      if (cartToDelete) {
        const newCarts = allCarts.filter(cart => cart.id !== cartId)

        await fs.promises.writeFile(
          '../data/carts.json',
          JSON.stringify(newCarts)
        )
      } else {
        return -1
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  getCartProducts = async (cartId: string) => {
    try {
      const cart = await this.getById(cartId)

      if (cart === null) return -1

      const products: Product[] = cart.products
      return products
    } catch (err) {
      console.log(err.message)
      return []
    }
  }

  saveProduct = async (cartId: string, product: Product) => {
    try {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === cartId) 

      if (cartIndex < 0) return -1

      carts[cartIndex].products.push(product)

      await fs.promises.writeFile(
        '../data/carts.json',
        JSON.stringify(carts)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  deleteProduct = async (cartId: string, productId: string) => {
    try {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === cartId) 

      if (cartIndex < 0) return -1

      carts[cartIndex].products = carts[cartIndex].products.filter(prod => prod.id !== productId)

      await fs.promises.writeFile(
        '../data/carts.json',
        JSON.stringify(carts)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  getById = async (cartId: string): Promise<Cart> => {
    try {
      const carts = await this.getAll()
      const cart = carts.find(cart => cart.id === cartId)

      if (cart) return cart
      return null
    } catch (err) {
      console.log(err.message)
      return null
    }
  }

  getAll = async (): Promise<Cart[]> => {
    try {
      const content = await fs.promises.readFile(
        '../data/carts.json',
        'utf-8'
      )
      const carts = JSON.parse(content || '[]')
      return carts
    } catch (err) {
      console.log(err.message)
      return []
    }
  }
}

export default CartsHandler
