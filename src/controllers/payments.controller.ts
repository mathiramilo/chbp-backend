import { HTTP_STATUS } from '../constants/api.constants'
import { successResponse } from '../utils/api.utils'
import { createPreference } from '../services/payments.services'

class PaymentsController {
  async createPreference(req, res, next) {
    const { cartId, buyerId, address } = req.body
    try {
      const preference = await createPreference(cartId, buyerId, address)
      const response = successResponse(preference)
      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new PaymentsController()
