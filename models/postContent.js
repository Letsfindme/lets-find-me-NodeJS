const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const PostContent = sequelize.define('postContent', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  title: Sequelize.STRING,
  text: Sequelize.STRING,
});

module.exports = PostContent;