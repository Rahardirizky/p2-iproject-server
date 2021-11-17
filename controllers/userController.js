const { comparePassword } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = await User.create({
        email,
        password,
        role: "Admin",
      });
      newUser.password = undefined;

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        if (comparePassword(password, user.password)) {
          user.password = undefined;
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          const token = getToken(payload);
          res.status(200).json({ token, user });
        } else {
          next({
            status: 401,
            msg: "Email / Password is Incorrect",
          });
        }
      } else {
        next({
          status: 401,
          msg: "Email / Password is Incorrect",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
