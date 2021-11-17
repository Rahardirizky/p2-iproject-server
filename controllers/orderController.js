const { Order, User, Service } = require("../models");
const kickboxGet = require("../apis/kickbox.js");

class OrderController {
  static async create(req, res, next) {
    try {
      let user;
      const { email, ServiceId, totalWeight, totalFee, payment } = req.body;

      user = await User.findOne({ where: { email } });
      const { disposable } = await kickboxGet(email.split("@")[1]);

      if(disposable) {
        next({
          status: 403,
          msg: 'Email Unauthorized'
        })
      }

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
      let orders;

      if (role === "Admin") {
        orders = await Order.findAll({
          include: [
            { model: Service, required: true },
            {
              model: User,
              required: true,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        });
      } else {
        orders = await Order.findAll({ where: { UserId: id } });
      }

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { status, payment } = req.body;
      const { id } = req.params;

      await Order.update({ status, payment }, { where: { id } });
      res.status(200).json({ msg: "Succes Update" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
