import { MercadoPagoConfig, Preference } from 'mercadopago'

import envConfig from '../config/env.config'
import CartsDAO from '../models/daos/carts.dao'
import { Address } from '../types/types'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

export const createPreference = async (cartId: string, buyerId: string, address: Address) => {
  const products = await CartsDAO.getProducts(cartId)
  const items = products.map(({ product, _, qty }) => ({
    id: product._id as string,
    title: product.title as string,
    quantity: Number(qty),
    unit_price: Number(product.price)
  }))
  const { address: location, city, country } = address

  const preference = await new Preference(client).create({
    body: {
      items,
      back_urls: {
        success:
          envConfig.MP_SUCCESS_URL +
          '?cartId=' +
          cartId +
          '&paymentProvider=mercadopago' +
          '&buyerId=' +
          buyerId +
          '&address=' +
          location +
          '&city=' +
          city +
          '&country=' +
          country,
        pending: envConfig.MP_PENDING_URL,
        failure: envConfig.MP_FAILURE_URL
      },
      auto_return: 'approved'
    }
  })

  return preference
}
