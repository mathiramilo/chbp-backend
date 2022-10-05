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

export interface Cart {
  id: string
  timestamp: string
  products: Product[]
}
