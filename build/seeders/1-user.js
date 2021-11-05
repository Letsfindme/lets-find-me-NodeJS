'use strict';

var bcrypt = require('bcrypt');

var config = require('../config/server.json');

var params = require('../config/params.json');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: 'The Admin',
      email: 'admin@crate.com',
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: params.user.roles.admin,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'The User',
      email: 'user@crate.com',
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: params.user.roles.user,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
//# sourceMappingURL=1-user.js.map