const { Service } = require("../models");

class ServiceController {
  static async create(req, res, next) {
    try {
      const { name, fee } = req.body;

      const response = await Service.findAll({ where: { name } });

      if (response.length) {
        next({
          status: 409,
          msg: `Service with name: ${name} are already exists`,
        });
      } else {
        const service = await Service.create({ name, fee });

        res.status(201).json(service);
      }
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const get = await Service.findAll()
      res.status(200).json(get)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ServiceController;
