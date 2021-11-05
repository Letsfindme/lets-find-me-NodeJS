"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../setup/models"));

var Product = require("../models/product");
/**
 * Create new product by admin auth
 */


exports.postAddProduct =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, title, price, description, error, product;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, title = _req$body.title, price = _req$body.price, description = _req$body.description;

            if (req.files[0]) {
              _context.next = 6;
              break;
            }

            error = new Error("No image provided or user not registred");
            error.statusCode = 422;
            throw error;

          case 6:
            if (!(!title || !price || !description)) {
              _context.next = 9;
              break;
            }

            console.log("message: Body is empty! error creating product!");
            return _context.abrupt("return", res.status(400).json({
              message: "Body is empty! error creating product!"
            }));

          case 9:
            _context.next = 11;
            return _models["default"].Product.create({
              title: title,
              price: price,
              imageUrl: req.files[0].path,
              description: description
            });

          case 11:
            product = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              product: product,
              message: "success created product!"
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "error creating product!"
            });
            console.error("message: error creating product!", _context.t0.message);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Admin update exesiting product
 */


exports.putEditProduct =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, title, price, description, prodId, imageUrl, product, savedProduct;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, title = _req$body2.title, price = _req$body2.price, description = _req$body2.description, prodId = _req$body2.prodId, imageUrl = _req$body2.imageUrl;
            _context2.next = 4;
            return _models["default"].Product.findByPk(prodId);

          case 4:
            product = _context2.sent;
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = req.files[0] ? req.files[0].path : imageUrl;
            _context2.next = 11;
            return product.save();

          case 11:
            savedProduct = _context2.sent;
            res.status(200).json({
              result: savedProduct,
              message: "product update success"
            });
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);

            (function (err) {
              return console.log(err);
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Admin get all products
 */


exports.getProducts =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models["default"].Product.findAll();

          case 3:
            products = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(products));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            (function (err) {
              return console.log(err);
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Admin delete a product by id
 */


exports.postDeleteProduct =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    var prodId, product, deletedProduct;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            prodId = req.body.prodId;
            _context4.next = 4;
            return _models["default"].Product.findByPk(prodId);

          case 4:
            product = _context4.sent;

            if (!product) {
              res.status(400).json({
                deletedProduct: deletedProduct,
                message: "Not found!!"
              });
            }

            _context4.next = 8;
            return product.destroy();

          case 8:
            deletedProduct = _context4.sent;
            res.status(200).json({
              deletedProduct: deletedProduct,
              message: "DESTROYED PRODUCT"
            });
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            console.log(err);
            res.status(500).json({
              message: "Can't delete :/"
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=admin.js.map