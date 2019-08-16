const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Image = sequelize.define('Image', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  imageRef: Sequelize.STRING,
  
});

module.exports = Image;