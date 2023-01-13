import { Schema } from 'mongoose'

const CartSchema = new Schema({
  timestamp: { type: Date, default: new Date().toLocaleString() },
  products: { type: Array, required: true, default: [] }
})

export default CartSchema
