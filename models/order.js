const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User = require('./user');
const Product = require('./product');
const OrderItem = require('./order-item');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

// Order.associate = () => {
//   Order.belongsTo(User, {
//     constraints: true,
//     onDelete: 'CASCADE'
//   })
// };

// Order.belongsToMany(Product, {
//   through: OrderItem
// });
// Order.belongsTo(User)
// , {
//   constraints: true,
//   onDelete: 'CASCADE'
// });

module.exports = Order;
