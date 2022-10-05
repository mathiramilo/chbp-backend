import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '../../types/types'
import ProductsHandler from '../../models/ProductsHandler'
import authMiddleware from '../../middlewares/auth'

const productsHandler = new ProductsHandler()

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await productsHandler.getAll()
    res.json({ success: true, result: products })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting all products'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await productsHandler.getById(id)
    if (product) {
      res.json({ success: true, result: product })
    } else {
      res.status(404).json({ success: false, error: 'Product not found' })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting the product'
    })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, code, imgUrl, price, stock } = req.body

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: missing fields'
      })
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: incorrect types'
      })
    }

    const newProduct: Product = { 
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
      name,
      description,
      code,
      imgUrl,
      price,
      stock
    }
    await productsHandler.save(newProduct)
    return res.json({ success: true, result: newProduct })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred saving the product'
    })
  }
})

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const {
      params: { id },
      body: { name, description, code, imgUrl, price, stock }
    } = req

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: missing fields'
      })
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: incorrect types'
      })
    }

    const product = await productsHandler.getById(id)

    const productUpdated: Product = { 
      ...product,
      name,
      description,
      code,
      imgUrl,
      price,
      stock
    }
    const updateByIdResult = await productsHandler.updateById(productUpdated)

    if (updateByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id ${id} does not exist`
      })
    } else {
      return res.json({ success: true, result: productUpdated })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred updating the product'
    })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const deleteByIdResult = await productsHandler.deleteById(id)

    if (deleteByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: `Product with id ${id} deleted`
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred deleting the product'
    })
  }
})

export default router
