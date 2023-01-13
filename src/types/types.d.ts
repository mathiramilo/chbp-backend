export interface Product {
  id: string
  timestamp: string
  name: string
  description: string
  code: string
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
