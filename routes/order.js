const OrderController = require("../controllers/orderController");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/", OrderController.create);
router.get("/", OrderController.read);
router.get("/total", OrderController.getTotalFee)
router.put("/:id", authorization, OrderController.edit);

module.exports = router;
