"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _chalk = _interopRequireDefault(require("chalk"));

var _env = require("../config/env");

var _database = _interopRequireDefault(require("../config/database.json"));

// Imports
// App Imports
// Load database config
var databaseConfigEnv = _database["default"][_env.NODE_ENV]; // Create new database connection

var connection = new _sequelize.Sequelize(databaseConfigEnv.database, databaseConfigEnv.username, databaseConfigEnv.password, {
  host: databaseConfigEnv.host,
  dialect: databaseConfigEnv.dialect,
  logging: console.log,
  port: databaseConfigEnv.port
}); // Test connection

console.info("SETUP - Connecting database...", databaseConfigEnv.port);
connection // .sync({
//     force: true
// })
.authenticate().then(function () {
  console.info(_chalk["default"].green.inverse.bold("INFO - Database connected."));
})["catch"](function (err) {
  console.error(_chalk["default"].red.bgGreen.bold("ERROR - Unable to connect to the database:", err));
});
var _default = connection;
exports["default"] = _default;
//# sourceMappingURL=database.js.map