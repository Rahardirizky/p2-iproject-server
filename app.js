if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)
app.listen(PORT, () => console.log(`app is running in ${PORT}`))