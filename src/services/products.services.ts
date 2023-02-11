import ProductsDAO from '../models/daos/products.dao'

export const getProducts = async category => {
  const products = await ProductsDAO.getAll()

  if (!category) return products

  return products.filter(product => product.category === category)
}
export const getProduct = async (id: string) => await ProductsDAO.getById(id)
export const createProduct = async product => await ProductsDAO.save(product)
export const updateProduct = async (id: string, product) => await ProductsDAO.update(id, product)
export const deleteProduct = async (id: string) => await ProductsDAO.delete(id)
