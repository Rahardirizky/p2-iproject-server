const errorHandler = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({ msg: "Unauthorized access" });
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => el.message);
    res.status(400).json({
      msg: "Bad Request",
      errors,
    });
  } else {
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal Server Error" });
  }
};

module.exports = errorHandler;
