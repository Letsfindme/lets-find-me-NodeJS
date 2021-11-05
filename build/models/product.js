"use strict";

var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Product.associate = function (models) {
    Product.belongsToMany(models.Cart, {
      through: models.CartItem
    });
  };

  return Product;
};
//# sourceMappingURL=product.js.map