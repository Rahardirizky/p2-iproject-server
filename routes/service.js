const ServiceController = require("../controllers/serviceController")
const router = require("express").Router()

router.post('/', ServiceController.create)

module.exports = router