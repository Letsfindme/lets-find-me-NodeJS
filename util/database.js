const Sequelize = require('sequelize');

const sequelize = new Sequelize('letsfind', 'postgres', 'rootroot', {
  dialect: 'postgres',
  host: 'localhost',
  port:'3306'
});

module.exports = sequelize;
