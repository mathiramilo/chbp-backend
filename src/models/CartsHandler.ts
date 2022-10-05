import fs from 'fs'
import { Cart } from '../types/types'

class CartsHandler {
  fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
  }

  save = async (cart: Cart) => {
    try {
      const carts = await this.getAll()
      carts.push(cart)

      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(carts)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  updateById = async (cart: Cart) => {
    try {
      const { id, products } = cart
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(prod => prod.id === id)

      if (cartIndex < 0) return -1

      const newCart = {
        ...carts[cartIndex],
        products
      }
      carts[cartIndex] = newCart
      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(carts)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getById = async (cartId: string): Promise<Cart> => {
    try {
      const carts = await this.getAll()
      const cart = carts.find(cart => cart.id === cartId)

      if (cart) return cart
      return null
    } catch (err) {
      console.log(err.message.red)
      return null
    }
  }

  getAll = async (): Promise<Cart[]> => {
    try {
      const content = await fs.promises.readFile(
        `data/${this.fileName}`,
        'utf-8'
      )
      const carts = JSON.parse(content || '[]')
      return carts
    } catch (err) {
      console.log(err.message.red)
      return []
    }
  }

  deleteById = async (cartId: string) => {
    try {
      const allCarts = await this.getAll()
      const cartToDelete = allCarts.find(cart => cart.id === cartId)

      if (cartToDelete) {
        const newCarts = allCarts.filter(cart => cart.id !== cartId)

        await fs.promises.writeFile(
          `data/${this.fileName}`,
          JSON.stringify(newCarts)
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

export default CartsHandler