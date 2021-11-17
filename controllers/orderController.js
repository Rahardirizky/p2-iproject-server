const { Order, User, Service } = require("../models");
const kickboxGet = require("../apis/kickbox.js");
const mathjsPost = require("../apis/mathjs");
const { Op } = require("sequelize");
const emailSent = require("../helpers/nodemailer");

class OrderController {
  static async create(req, res, next) {
    try {
      let user;
      let body;
      const { email, ServiceId, totalWeight, totalFee, payment } = req.body;

      user = await User.findOne({ where: { email } });
      const { disposable } = await kickboxGet(email.split("@")[1]);

      if (!user) {
        if (disposable) {
          next({
            status: 403,
            msg: "Email Unauthorized",
          });
        } else {
          user = await User.create({
            email,
            password: process.env.DEFAULT_PASSWORD,
            role: "Customer",
          });
          body = {
            from: `"Laundry's Work" <${process.env.EMAIL}>`,
            to: email,
            subject: "password account and receipt",
            html: `
            <p> Dear, ${email.split("@")[0]} </p>

            <p> Here is your password: 12345</p>
            <p> and your receipt</p>

            <p>Total Weight: ${totalWeight}</p>
            <p>Total Fee: ${totalFee}</p>
            <p>and with status: ${payment}</p>

            <p>Thankyou</p>
            `,
          };
        }
      } else {
        body = {
          from: `"Laundry's Work" <${process.env.EMAIL}>`,
          to: email,
          subject: "password account and receipt",
          html: `
          <p> Dear, ${email.split("@")[0]} </p>

          <p> Here is your receipt</p>

          <p>Total Weight: ${totalWeight}</p>
          <p>Total Fee: ${totalFee}</p>
          <p>and with status: ${payment}</p>

          <p>Thankyou</p>
          `,
        };
      }

      const newOrder = await Order.create({
        UserId: user.id,
        ServiceId,
        totalWeight,
        totalFee,
        payment,
        status: "Drop",
      });

      emailSent.sendMail(body, (error) => {
        if (error) {
          throw new Error(error);
        }
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
        const { page, limit = 4, email } = req.query;
        const filter = {};

        if (page) {
          offset = (page - 1) * limit;
        }

        if (email) {
          const users = await User.findAll({
            where: { email: { [Op.like]: `%${email}%` } },
          });
          filter.UserId = users.map((el) => el.id);
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
          offset,
          limit,
          where: filter,
        });
        console.log({ orders });
      } else {
        orders = await Order.findAll({
          where: { UserId: id },
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
      }

      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { status, payment } = req.body;
      const { id } = req.params;

      const updatedOrder = await Order.update(
        { status, payment },
        {
          where: { id },
          returning: true,
          plain: true,
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
        }
      );

      const user = await User.findByPk(updatedOrder[1].UserId);
      console.log(user, updatedOrder[1]);

      if (status === "Finish") {
        const body = {
          from: `"Laundry's Work" <${process.env.EMAIL}>`,
          to: user.email,
          subject: "password account and receipt",
          html: `
          <p> Dear, ${user.email.split("@")[0]} </p>

          <p> Your laundry has been finished</p>

          <p>Thankyou</p>
          `,
        };

        emailSent.sendMail(body, (error) => {
          if (error) {
            throw new Error(error);
          }
        });
      }

      res.status(200).json({ msg: "Succes Update" });
    } catch (error) {
      console.log(error);
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
