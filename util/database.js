const Sequelize = require('sequelize');

const sequelize = new Sequelize('letsfind', 'root', 'rootroot', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
