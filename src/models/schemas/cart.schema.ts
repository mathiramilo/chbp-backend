import { Schema } from 'mongoose'

const cartSchema = new Schema({
  timestamp: { type: Date, default: new Date().toLocaleString() },
  products: { type: Array, required: true, default: [] }
})

export default cartSchema
