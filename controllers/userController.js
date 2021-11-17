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
}

module.exports = UserController;
