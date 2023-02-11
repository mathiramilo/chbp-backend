export interface Product {
  id: string
  timestamp: string
  name: string
  description: string
  category: string
  imgUrl: string
  price: number
  stock: number
}

export interface CartProduct {
  product: Product
  qty: number
}

export interface Cart {
  id: string
  timestamp: string
  products: CartProduct[]
}

export interface User {
  id: string
  timestamp: string
  fullName: string
  email: string
  password: string
  phone: string
  cartId: string
}
