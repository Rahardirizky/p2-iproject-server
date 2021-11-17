const OrderController = require("../controllers/orderController");
const router = require("express").Router();

router.post("/", OrderController.create);
router.get("/", OrderController.read);

module.exports = router;
