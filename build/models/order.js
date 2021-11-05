"use strict";

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderItem
    });
  };

  return Order;
};
//# sourceMappingURL=order.js.map