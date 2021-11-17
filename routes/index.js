const router = require("express").Router()
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const serviceRoutes = require('./service')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/services', serviceRoutes)

module.exports = router