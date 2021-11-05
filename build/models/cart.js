"use strict";

module.exports = function (sequelize, DataTypes) {
  var Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Cart.belongsToMany(models.Product, {
      through: models.CartItem
    });
  };

  return Cart;
};
//# sourceMappingURL=cart.js.map