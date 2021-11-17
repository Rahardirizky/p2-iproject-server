if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)
app.listen(process.env.PORT, () => console.log(`app is running in ${process.env.PORT}`))