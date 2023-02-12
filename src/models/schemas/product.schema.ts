import { Schema } from 'mongoose'
import { colorValidator } from '../../utils/product.utils'

const ProductSchema = new Schema({
  timestamp: { type: Date, default: new Date() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['nike', 'adidas', 'puma'] },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true, validate: colorValidator },
  stock: { type: Number, required: true }
})

export default ProductSchema
