import { HTTP_STATUS } from '../constants/api.constants'
import { HttpError, successResponse } from '../utils/api.utils'
import sendEmail from '../utils/email.utils'
import sendSMS from '../utils/sms.utils'
import sendWhatsapp from '../utils/whatsapp.utils'
import CartsDAO from '../models/daos/carts.dao'

const cartsDAO = new CartsDAO()

class CartsController {
  async createCart(req, res, next) {
    try {
      const newCart = await cartsDAO.save()
      const response = successResponse(newCart)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params
    try {
      const deletedCart = await cartsDAO.delete(id)
      const response = successResponse(deletedCart)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProducts(req, res, next) {
    const { id } = req.params
    try {
      const products = await cartsDAO.getProducts(id)
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const newProduct = await cartsDAO.saveProduct(cartId, prodId)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const deletedProduct = await cartsDAO.deleteProduct(cartId, prodId)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async decreaseProduct(req, res, next) {
    const { cartId, prodId } = req.params
    try {
      const decreasedProduct = await cartsDAO.decreaseProduct(cartId, prodId)
      const response = successResponse(decreasedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  /* When a user checkouts, we empty the cart, send an
  email and a wpp with the order and send an SMS to the user */
  async checkout(req, res, next) {
    const { cartId } = req.params
    const { name, email, phone } = req.body

    try {
      if (!name || !email || !phone) {
        const message =
          'Name, email and phone are required in the body to checkout'
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
      }

      const products = await cartsDAO.getProducts(cartId)

      if (products.length < 1) {
        const message = 'The cart must have at least one product to checkout'
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
      }

      await cartsDAO.emptyCart(cartId)

      // Email, Whatsapp and SMS sending
      const totalCost = products.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
      )

      const emailStyles = {
        productsContainer: 'margin: 10px 0px;',
        card: 'border: 1px solid #ccc; padding: 12px; margin: 10px 0px; border-radius: 8px;',
        title: 'font-size: 18px; font-weight: bold;'
      }

      const productsCardsHtml = products
        .map(item => {
          return `
          <div style="${emailStyles.card}">
            <h3>${item.product.name}</h3>
            <p>${item.product.description}</p>
            <p>Total: US$ ${item.product.price} x ${item.qty} = US$ ${(
            item.product.price * item.qty
          ).toFixed(2)}</p>
          </div>
        `
        })
        .join('')

      const bodyHtml = `
        <h2 style="${emailStyles.title}">Products Ordered</h2>
        <div style=${emailStyles.productsContainer}>
          ${productsCardsHtml}
        </div>
        <h2 style="${emailStyles.title}">Total: US$ ${totalCost.toFixed(2)}</h2>
      `

      sendEmail({
        subject: `New Order of ${name} - (${email})`,
        html: bodyHtml
      })

      const productsListText = products
        .map(item => {
          return `${item.qty}x ${item.product.name} (${
            item.product.description
          }) - US$ ${(item.product.price * item.qty).toFixed(2)}`
        })
        .join('\n')

      const text = `New Order of ${name} - (${email})
  
      ${productsListText}`

      sendWhatsapp({
        message: text
      })

      sendSMS({
        to: phone,
        message: `Your order has been received and its being processed. Thanks for your purchase! CHBP Team`
      })

      const response = successResponse({
        buyer: { name, email, phone },
        products
      })
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default new CartsController()
