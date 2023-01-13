import MongoContainer from '../containers/mongo.container'
import UserSchema from '../schemas/User.schema'
import { HttpError } from '../../utils/api.utils'
import { HTTP_STATUS } from '../../constants/api.constants'

const collection = 'users'

class UsersDAO extends MongoContainer {
  constructor() {
    super(collection, UserSchema)
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email }, { __v: 0 })
    if (!user) {
      const message = `User with email ${email} doesn't exist`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return user
  }
}

export default UsersDAO
