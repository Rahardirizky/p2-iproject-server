const { Order } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (order) {
      if (req.decoded.role === "Admin") {
        next();
      } else {
        next({
          status: 403,
          msg: "Unauthorized",
        });
      }
    } else {
      next({
        status: 404,
        msg: "Error Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
