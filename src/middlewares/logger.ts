const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const date = new Date().toLocaleString()

  console.log(`[${method}] => ${url}`, date)
  next()
}

export default logger
