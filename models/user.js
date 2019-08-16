const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: Sequelize.STRING,
  country: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  firstConnection: Sequelize.DATE,
  lastConnection: Sequelize.DATE,
  avatar: Sequelize.BOOLEAN,
  // TIMESTAMP WITH TIME ZONE for postgres,
  createdDate: Sequelize.DATE,
  birthday: Sequelize.DATE,
  age: Sequelize.INTEGER,
  status: Sequelize.STRING,
});

module.exports = User;