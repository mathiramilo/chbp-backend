import ProductsDAO from '../models/daos/products.dao'

export const getProducts = async () => await ProductsDAO.getAll()
export const getProduct = async (id: string) => await ProductsDAO.getById(id)
export const createProduct = async product => await ProductsDAO.save(product)
export const updateProduct = async (id: string, product) => await ProductsDAO.update(id, product)
export const deleteProduct = async (id: string) => await ProductsDAO.delete(id)
