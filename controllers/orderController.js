const { Order, User, Service } = require("../models");
const kickboxGet = require("../apis/kickbox.js");
const mathjsPost = require("../apis/mathjs");

class OrderController {
  static async create(req, res, next) {
    try {
      let user;
      const { email, ServiceId, totalWeight, totalFee, payment } = req.body;

      user = await User.findOne({ where: { email } });
      const { disposable } = await kickboxGet(email.split("@")[1]);

      if (disposable) {
        next({
          status: 403,
          msg: "Email Unauthorized",
        });
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
      let offset;

      if (role === "Admin") {
        const { page, limit = 4 } = req.query;

        if(page) {
          offset = (page - 1) * limit;
        }

        orders = await Order.findAndCountAll({
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
          offset, limit
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

  static async getTotalFee(req, res, next) {
    try {
      const { ServiceId, totalWeight } = req.body;

      const service = await Service.findByPk(ServiceId);

      if (service) {
        const totalFee = await mathjsPost(`${service.fee} * ${totalWeight}`);
        res.status(200).json(totalFee.result);
      } else {
        next({
          status: 404,
          msg: "Error not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
