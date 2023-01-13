import nodemailer from 'nodemailer'
import envConfig from '../config'
import logger from './logger.utils'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'orrin89@ethereal.email',
    pass: 'FKdutMGEyRevz2ERtM'
  }
})

export const sendOrderMail = async (name, email, products) => {
  const total = products.reduce(
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
    <h2 style="${emailStyles.title}">Total: US$ ${total.toFixed(2)}</h2>
  `

  const mailOptions = {
    from: '"CHBP Server" orrin89@ethereal.email',
    to: envConfig.ADMIN_EMAIL,
    subject: `New order of ${name} - (${email})`,
    html: bodyHtml
  }
  const info = await transporter.sendMail(mailOptions)

  logger.info(
    `Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`
  )
}

export const sendRegisterMail = async newUser => {
  const bodyHtml = `
    <div>
      <p>Email: ${newUser.email}</p>
      <p>Name: ${newUser.name}</p>
      <p>Address: ${newUser.address}</p>
      <p>Age: ${newUser.age}</p>
      <p>Phone Number: ${newUser.phone}</p>
    </div>
  `

  const mailOptions = {
    from: '"CHBP Server" orrin89@ethereal.email',
    to: envConfig.ADMIN_EMAIL,
    subject: `New user registered`,
    html: bodyHtml
  }
  const info = await transporter.sendMail(mailOptions)

  logger.info(
    `Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`
  )
}
