const router = require("express").Router()
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const serviceRoutes = require('./service')
const orderRoutes = require('./order')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/services', serviceRoutes)
router.use('/orders', orderRoutes)

module.exports = router