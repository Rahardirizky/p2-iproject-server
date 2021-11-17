const OrderController = require("../controllers/orderController");
const router = require("express").Router();

router.post("/", OrderController.create);

module.exports = router;
