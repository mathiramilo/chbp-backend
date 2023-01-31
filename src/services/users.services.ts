import UsersDAO from '../models/daos/users.dao'

export const getUser = async (id: string) => await UsersDAO.getById(id)
