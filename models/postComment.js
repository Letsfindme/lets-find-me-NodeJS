const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const PostComment = sequelize.define('postComment', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  imageRef: Sequelize.STRING,
});

module.exports = PostComment;