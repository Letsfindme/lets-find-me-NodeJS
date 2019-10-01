const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require('./user');

const Address = sequelize.define("address", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4()
  },
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
  postcode: Sequelize.INTEGER
});

module.exports = Address;
