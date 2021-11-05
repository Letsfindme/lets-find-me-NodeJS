"use strict";

module.exports = function (sequelize, DataTypes) {
  var CartItem = sequelize.define("cartItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER
  });
  return CartItem;
};
//# sourceMappingURL=cart-item.js.map