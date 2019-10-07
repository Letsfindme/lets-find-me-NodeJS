const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = require('./user');
const Post = require('./post');

const PostRate = sequelize.define('postRate', {
  // id: {
  //   type: Sequelize.UUID,
  //   allowNull: false,
  //   primaryKey: true,
  //   defaultValue: Sequelize.UUIDV4
  // },
  rate: Sequelize.INTEGER,
});

// PostRate.belongsTo(User, {
//   constraints: true,
//   onDelete: 'CASCADE'
// })
// PostRate.belongsTo(Post, {
//   constraints: true,
//   onDelete: 'CASCADE'
// })
module.exports = PostRate;