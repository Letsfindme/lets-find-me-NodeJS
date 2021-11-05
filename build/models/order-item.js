"use strict";

module.exports = function (sequelize, DataTypes) {
  var OrderItem = sequelize.define("orderItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER
  });
  return OrderItem;
};
//# sourceMappingURL=order-item.js.map