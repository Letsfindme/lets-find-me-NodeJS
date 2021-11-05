"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("./database"));

// Imports
// App Imports
var models = {
  User: _database["default"]["import"]('../models/user'),
  Role: _database["default"]["import"]('../models/role'),
  Address: _database["default"]["import"]('../models/address'),
  Avatar: _database["default"]["import"]('../models/avatar'),
  CartItem: _database["default"]["import"]('../models/cart-item'),
  Cart: _database["default"]["import"]('../models/cart'),
  Image: _database["default"]["import"]('../models/image'),
  OrderItem: _database["default"]["import"]('../models/order-item'),
  Order: _database["default"]["import"]('../models/order'),
  Post: _database["default"]["import"]('../models/post'),
  PostContent: _database["default"]["import"]('../models/postContent'),
  PostComment: _database["default"]["import"]('../models/postComment'),
  PostRate: _database["default"]["import"]('../models/postRate'),
  Product: _database["default"]["import"]('../models/product')
};
Object.keys(models).forEach(function (modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
models.sequelize = _database["default"];
models.Sequelize = _sequelize["default"];
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=models.js.map