import OrdersDAO from '../models/daos/orders.dao'
import { Order } from '../types/types'

export const getOrders = async (email: string) => {
    const orders = await OrdersDAO.getAll()

    if (!email) return orders

    return orders.filter(order => order.buyer.email === email)
} 
export const getOrder = async (id: string) => await OrdersDAO.getById(id)
export const createOrder = async (order: Order) => await OrdersDAO.save(order)
export const deleteOrder = async (id: string) => await OrdersDAO.delete(id)
