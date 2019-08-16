const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const PostRate = sequelize.define('postRate', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  rate: Sequelize.INTEGER,
});

module.exports = PostRate;