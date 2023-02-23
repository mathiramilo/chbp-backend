import OrdersDAO from '../models/daos/orders.dao'
import { Order } from '../types/types'

export const getOrders = async () => await OrdersDAO.getAll()
export const getOrder = async (id: string) => await OrdersDAO.getById(id)
export const createOrder = async (order: Order) => await OrdersDAO.save(order)
export const deleteOrder = async (id: string) => await OrdersDAO.delete(id)
