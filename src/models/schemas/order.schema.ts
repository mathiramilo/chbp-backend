import { Schema } from 'mongoose'

const OrderSchema = new Schema({
  timestamp: { type: Date, default: new Date() },
  products: { type: Array, required: true, default: [] },
  buyer: { type: Object, required: true, default: {} },
  address: { type: Object, required: true, default: {} },
  payment: { type: Object, required: true, default: {} },
  totalCost: { type: Number, required: true, default: 0 }
})

export default OrderSchema
