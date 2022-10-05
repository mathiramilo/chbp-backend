const auth = (req, res, next) => {
  const { url, method } = req
  const isAdmin: boolean = process.env.ADMIN === 'true' || true

  if (!isAdmin) {
    return res.status(401).json({
      error: -1,
      description: `route ${url} method ${method} not authorized`
    })
  }

  next()
}

export default auth
