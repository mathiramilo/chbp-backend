import { Schema } from 'mongoose'

const ProductSchema = new Schema({
  timestamp: { type: Date, default: new Date() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
})

export default ProductSchema
