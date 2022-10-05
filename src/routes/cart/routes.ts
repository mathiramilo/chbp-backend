import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Cart } from '../../types/types'
import CartsHandler from '../../models/cartsHandler'

const cartsHandler = new CartsHandler()

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newCart: Cart = { 
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
      products: []
    }
    await cartsHandler.create(newCart)

    return res.json({ success: true, result: newCart })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred creating a cart'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteByIdResult = await cartsHandler.deleteById(id)

    if (deleteByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Cart with id ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: `Cart with id ${id} deleted`
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred deleting the cart'
    })
  }
})

router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params
    const getCartProductsResult = await cartsHandler.getCartProducts(id)

    if (getCartProductsResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Cart with id ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: getCartProductsResult
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting the products from the cart'
    })
  }
})

router.post('/:id/products', async (req, res) => {
  try {
    const {
      params: { id },
      body: { product }
    } = req

    if (!product || !product.id || !product.timestamp || !product.name || !product.description || !product.code || !product.imgUrl || !product.price || !product.stock) {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: missing fields'
      })
    }
    if (typeof product.id !== 'string' || typeof product.timestamp !== 'string' || typeof product.name !== 'string' || typeof product.description !== 'string' || typeof product.code !== 'string' || typeof product.imgUrl !== 'string' || typeof product.price !== 'number' || typeof product.stock !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: incorrect types'
      })
    }

    const saveProductResult = await cartsHandler.saveProduct(id, product)

    if (saveProductResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Cart with id ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: product
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred saving the product in the cart'
    })
  }
})

router.delete('/:id/products/:id_prod', async (req, res) => {
  try {
    const { id: cartId, id_prod: prodId } = req.params

    const deleteProductResult = await cartsHandler.deleteProduct(cartId, prodId)

    if (deleteProductResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Cart with id ${cartId} does not exist`
      })
    } else if (deleteProductResult === -2) {
      return res.status(404).json({
        success: false,
        error: `Product with id ${prodId} does not exist in cart with id ${cartId}`
      })
    } else {
      return res.json({
        success: true,
        result: `Product with id ${prodId} deleted from cart with id ${cartId}`
      })
    }    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred deleting the product from the cart'
    })
  }
})

export default router
