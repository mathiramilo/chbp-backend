import ProductsDAO from '../database/daos/products.dao'

const productsDAO = new ProductsDAO()

export const getProducts = async () => await productsDAO.getAll()
export const getProduct = async id => await productsDAO.getById(id)
export const createProduct = async product => await productsDAO.save(product)
export const updateProduct = async (id, product) => await productsDAO.update(id, product)
export const deleteProduct = async id => await productsDAO.delete(id)
