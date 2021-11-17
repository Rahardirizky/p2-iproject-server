const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      req.decoded = verifyToken(token);
      const user = await User.findByPk(req.decoded.id);
      if (!user) {
        next({
          status: 401,
          msg: "Please Login First",
        });
      } else {
        next();
      }
    } else {
      next({
        status: 401,
        msg: "Please Login First",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
