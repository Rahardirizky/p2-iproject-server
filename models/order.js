"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Service);
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId cannot be empty" },
          notNull: { msg: "UserId cannot be empty" },
        },
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ServiceId cannot be empty" },
          notNull: { msg: "ServiceId cannot be empty" },
        },
      },
      totalWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Total Weight cannot be empty" },
          notNull: { msg: "Total Weight cannot be empty" },
        },
      },
      totalFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Total Fee cannot be empty" },
          notNull: { msg: "Total Fee cannot be empty" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "status cannot be empty" },
          notNull: { msg: "status cannot be empty" },
        },
      },
      payment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "payment cannot be empty" },
          notNull: { msg: "payment cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
