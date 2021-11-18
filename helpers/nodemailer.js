const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  secure: false,
  port: 25,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})


module.exports = transporter