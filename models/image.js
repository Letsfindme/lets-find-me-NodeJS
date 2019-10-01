const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Post = require('./post');

const Image = sequelize.define('Image', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  imageRef: Sequelize.STRING,
  
});
// Image.belongsTo(Post)
module.exports = Image;