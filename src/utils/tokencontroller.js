import jwt from 'jsonwebtoken'

// to generate access token accept one parameter to specify what fields to be signed
export const generateAccessToken = (user) => jwt.sign(user, process.env.PRIVATE_KEY)

// to authenticate token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null || !token) {
    return res.status(401).json({ code: 5000, message: 'Authentication Required. Please Login' })
  }

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ code: 404040, message: err })
    }
    req.user = user
    next()
  })
}
