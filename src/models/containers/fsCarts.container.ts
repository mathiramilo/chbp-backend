import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Cart } from '../../types/types'
import { HTTP_STATUS } from '../../constants/api.constants'
import { HttpError } from '../../utils/api.utils'
import ProductsContainer from './fsProducts.container'

const productsModel = new ProductsContainer()

class CartsContainer {
  constructor() {}

  create = async () => {
    const carts = await this.getAll()
    const newCart: Cart = { 
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
      products: []
    }

    carts.push(newCart)
    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/carts.json'),
      JSON.stringify(carts)
    )
    return newCart
  }

  deleteById = async (id: string) => {
    const allCarts = await this.getAll()
    const cartToDelete = allCarts.find(cart => cart.id === id)

    if (!cartToDelete) {
      const message = `Cart with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    const newCarts = allCarts.filter(cart => cart.id !== id)
    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/carts.json'),
      JSON.stringify(newCarts)
    )
    return cartToDelete
  }

  getCartProducts = async (id: string) => {
      const cart = await this.getById(id)

      if (!cart) {
        const message = `Cart with id ${id} does not exists`
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      const products = cart.products
      return products
  }

  saveProduct = async (cartId: string, prodId: string) => {
    const carts = await this.getAll()
    const cartIndex = carts.findIndex(cart => cart.id === cartId) 

    if (cartIndex < 0) {
      const message = `Cart with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }

    const productToSave = await productsModel.getById(prodId)
    carts[cartIndex].products.push(productToSave)

    await fs.promises.writeFile(
      path.resolve(__dirname, '../data/carts.json'),
      JSON.stringify(carts)
    )
    return productToSave
  }

  deleteProduct = async (id: string, productId: string) => {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === id) 

      if (cartIndex < 0) {
        const message = `Cart with id ${id} does not exists`
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      const productToDelete = carts[cartIndex].products.find(product => product.id === productId)

      if (!productToDelete)  {
        const message = `Product with id ${productId} does not exists in cart with id ${id}`
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      const newCarts = carts[cartIndex].products.filter(prod => prod.id !== productId)
      carts[cartIndex].products = newCarts

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/carts.json'),
        JSON.stringify(carts)
      )
      return productToDelete
  }

  getById = async (id: string): Promise<Cart> => {
    const carts = await this.getAll()
    const cart = carts.find(cart => cart.id === id)
    if (!cart) {
      const message = `Cart with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return cart
  }

  getAll = async (): Promise<Cart[]> => {
    const content = await fs.promises.readFile(
      path.resolve(__dirname, '../data/carts.json'),
      'utf-8'
    )
    const carts = JSON.parse(content || '[]')
    return carts
  }
}

export default CartsContainer
