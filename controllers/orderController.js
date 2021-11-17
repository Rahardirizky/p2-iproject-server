const { Order, User } = require("../models");

class OrderController {
  static async create(req, res, next) {
    try {
      let user;
      const { email, ServiceId, totalWeight, totalFee, payment } = req.body;

      user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          email,
          password: process.env.DEFAULT_PASSWORD,
          role: "Customer",
        });
      }

      const newOrder = await Order.create({
        UserId: user.id,
        ServiceId,
        totalWeight,
        totalFee,
        payment,
        status: "Drop",
      });
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const { role, id } = req.decoded;
      let orders 

      if(role === 'Admin') {
        orders = await Order.findAll()
      } else {
        orders = await Order.findAll({where: {UserId: id}})
      }

      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController;
