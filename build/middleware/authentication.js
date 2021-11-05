"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _server = _interopRequireDefault(require("../config/server.json"));

var _models = _interopRequireDefault(require("../setup/models"));

// Imports
// Authentication middleware
module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var authToken, error, token, _error, _error2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authToken = req.headers.authorization;

            if (!(authToken && authToken !== null)) {
              _context.next = 23;
              break;
            }

            _context.prev = 2;

            if (authToken) {
              _context.next = 6;
              break;
            }

            error = new Error("No token!!");
            throw error;

          case 6:
            token = authToken.split(" ")[1];
            req.userTok = _jsonwebtoken["default"].verify(token, _server["default"].secret);
            req.userId = req.userTok.userId;
            _context.next = 11;
            return _models["default"].User.findByPk(req.userId, {
              include: [{
                model: _models["default"].Role,
                attributes: ["type"]
              }]
            });

          case 11:
            req.user = _context.sent;

            if (req.user) {
              _context.next = 15;
              break;
            }

            _error = new Error("No user found!!");
            throw _error;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            //todo logs
            console.log(_context.t0.message); // error.statusCode = 401;
            // throw error;

            return _context.abrupt("return", next(_context.t0));

          case 21:
            _context.next = 27;
            break;

          case 23:
            req.user = {};
            console.warn("No token detected.");
            _error2 = new Error("Not authenticated."); // error.statusCode = 401;
            // throw error;

            return _context.abrupt("return", next(_error2));

          case 27:
            next();

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 17]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=authentication.js.map