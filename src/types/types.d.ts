export interface Product {
  id: string
  timestamp: string
  title: string
  description: string
  category: string
  imgUrl: string
  price: number
  stock: number
}

export interface CartProduct {
  product: Product
  size: number
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

export interface Order {
  id: string
  timestamp: string
  products: CartProduct[]
  buyer: Buyer
  address: Address
  payment: Payment
  totalCost: number
}

export interface Buyer {
  name: string
  email: string
  phone: string
}

export interface Address {
  address: string
  city: string
  country: string
}

export interface Payment {
  cardNumber: number
  cardHolder: string
  expirationDate: string
  cvv: number
}
