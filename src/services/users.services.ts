import UsersDAO from '../models/daos/users.dao'
import CartsDAO from '../models/daos/carts.dao'

export const getUser = async (id: string) => await UsersDAO.getById(id)
export const assignCartToUser = async (userId: string) => {
  const user = await UsersDAO.getById(userId)
  const cart = await CartsDAO.save()
  user.cartId = cart._id
  await UsersDAO.update(user._id, user)
  return user
}
