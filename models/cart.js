const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = require('./product');
const CartItem = require('./cart-item');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
// Cart.belongsToMany(Product, {
//   through: CartItem
// });
module.exports = Cart;
