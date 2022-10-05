import fs from 'fs'
import path from 'path'
import { Cart, Product } from '../types/types'

class CartsHandler {
  constructor() {}

  create = async (cart: Cart) => {
    try {
      const carts = await this.getAll()
      carts.push(cart)

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/carts.json'),
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
          path.resolve(__dirname, '../data/carts.json'),
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

      const products = cart.products
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
        path.resolve(__dirname, '../data/carts.json'),
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

      if (!carts[cartIndex].products.find(prod => prod.id === productId)) return -2

      const newCarts = carts[cartIndex].products.filter(prod => prod.id !== productId)
      carts[cartIndex].products = newCarts

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/carts.json'),
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
        path.resolve(__dirname, '../data/carts.json'),
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
