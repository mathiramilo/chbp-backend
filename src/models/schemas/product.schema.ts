import { Schema } from 'mongoose'

const productSchema = new Schema({
  timestamp: { type: Date, default: new Date().toLocaleString() },
  name: { type: String , required: true },
  description: { type: String , required: true },
  code: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
})

export default productSchema
