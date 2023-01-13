import twilio from 'twilio'
import envConfig from '../config'

const twilioClient = twilio(
  envConfig.TWILIO_ACCOUNT_SID,
  envConfig.TWILIO_AUTH_TOKEN
)

const sendWhatsapp = async (name, email, products) => {
  const productsListText = products
    .map(item => {
      return `${item.qty}x ${item.product.name} (${
        item.product.description
      }) - US$ ${(item.product.price * item.qty).toFixed(2)}`
    })
    .join('\n')

  const text = `New order of ${name} - (${email})
  
  ${productsListText}`

  await twilioClient.messages.create({
    body: text,
    from: envConfig.TWILIO_WHATSAPP,
    to: envConfig.ADMIN_WHATSAPP
  })
}

export default sendWhatsapp
