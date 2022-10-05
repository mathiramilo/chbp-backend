import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Cart } from '../../types/types'
import CartsHandler from '../../models/cartsHandler'
import authMiddleware from '../../middlewares/auth'

const cartsHandler = new CartsHandler('carts.json')

const router = express.Router()

export default router
