"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../setup/models"));

var _server = _interopRequireDefault(require("../config/server.json"));

var jwt = require("jsonwebtoken");

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, error, token, decodedToken, _error, _error2, user, _error3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            authHeader = req.get("Authorization");

            if (authHeader) {
              _context.next = 6;
              break;
            }

            error = new Error("Not authenticated.");
            error.statusCode = 401;
            throw error;

          case 6:
            token = authHeader.split(" ")[1]; // decodedToken;

            decodedToken = jwt.verify(token, _server["default"].secret);

            if (decodedToken) {
              _context.next = 14;
              break;
            }

            _error = new Error("Not authenticated.");
            _error.statusCode = 401;
            throw _error;

          case 14:
            if (!(!decodedToken.type === "Admin")) {
              _context.next = 18;
              break;
            }

            _error2 = new Error("Not admin.");
            _error2.statusCode = 401;
            throw _error2;

          case 18:
            req.userId = decodedToken.userId;
            _context.next = 21;
            return _models["default"].User.findByPk(req.userId, {
              include: [{
                model: _models["default"].Role,
                attributes: ["type"]
              }]
            });

          case 21:
            user = _context.sent;

            if (!(!user || !user.role || user.role.type != "Admin")) {
              _context.next = 26;
              break;
            }

            _error3 = new Error("Invalid request! No way!");
            _error3.statusCode = 401;
            throw _error3;

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 31:
            next();

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=is-admin.js.map