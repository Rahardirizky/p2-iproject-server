"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.Order);
    }
  }
  Service.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "name cannot be empty" },
          notNull: { msg: "name cannot be empty" },
        },
      },
      fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "fee cannot be empty" },
          notNull: { msg: "fee cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
