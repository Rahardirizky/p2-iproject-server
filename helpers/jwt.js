const jwt = require('jsonwebtoken')

const getToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET)
}

module.exports = {
  getToken
}