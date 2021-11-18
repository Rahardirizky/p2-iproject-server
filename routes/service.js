const ServiceController = require("../controllers/serviceController")
const router = require("express").Router()

router.post('/', ServiceController.create)
router.get('/', ServiceController.read)

module.exports = router