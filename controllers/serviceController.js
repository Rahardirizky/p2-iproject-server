const { Service } = require("../models");

class ServiceController {
  static async create(req, res, next) {
    const { name, fee } = req.body;

    const response =  await Service.findAll({ where: { name } });

    if (response.length) {
      next({
        status: 409,
        msg: `Service with name: ${name} are already exists`,
      });
    } else {
      const service = await Service.create({ name, fee });

      res.status(201).json(service);
    }
  }
}

module.exports = ServiceController;
