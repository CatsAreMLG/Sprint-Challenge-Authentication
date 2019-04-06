const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/secrets')

module.exports = {
  authenticate
}

function authenticate(req, res, next) {
  if (req && req.session && req.session.user) {
    const token = req.headers.authorization

    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json(err)

        req.decoded = decoded

        next()
      })
    } else {
      return res.status(401).json({
        error: 'No token provided, must be set on the Authorization Header'
      })
    }
  } else {
    return res.status(401).json({
      error: 'Please login'
    })
  }
}
