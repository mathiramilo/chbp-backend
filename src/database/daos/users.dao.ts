import { HTTP_STATUS } from '../../constants/api.constants'
import { HttpError } from '../../utils/api.utils'
import MongoDAO from './mongo.dao'
import UserSchema from '../models/User'

const collection = 'users'

class UsersDAO extends MongoDAO {
  constructor() {
    super(collection, UserSchema)
  }

  async getByEmail(email: string) {
    const user = await this.model.findOne({ email }, { __v: 0 })
    if (!user) {
      const message = `User with email ${email} doesn't exist`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return user
  }
}

export default new UsersDAO()
