"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _models = _interopRequireDefault(require("../setup/models"));

var _server = _interopRequireDefault(require("../config/server.json"));

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

exports.signup = function (req, res, next) {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed.');
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }

  /**
   * By default user hase 'user' type
   */
  var ROLETYPE = "User";
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, 12).then(function (hashedPw) {
    var User = new _models["default"].User({
      email: email,
      password: hashedPw,
      username: username
    });
    return User.save();
  }).then(function (User) {
    _models["default"].Role.findOne({
      where: {
        type: ROLETYPE
      }
    }).then(function (role) {
      return User.setRole(role);
    });

    return User;
  }).then(function (user) {
    return res.status(201).json({
      message: "User created!",
      userId: user._id
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};

exports.login = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var loadedUser;

  _models["default"].User.findAll({
    where: {
      email: email
    },
    include: [{
      model: _models["default"].Role,
      attributes: ["type"]
    }]
  }).then(function (user) {
    if (!user[0]) {
      var error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    loadedUser = user[0];
    return bcrypt.compare(password, user[0].password);
  }).then(function (isEqual) {
    if (!isEqual) {
      var error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    var token = jwt.sign({
      email: loadedUser.email,
      userId: loadedUser.id.toString(),
      type: loadedUser.role.type,
      credit: loadedUser.credit
    }, _server["default"].secret, {
      expiresIn: "240h"
    });
    res.status(200).json({
      token: token,
      userId: loadedUser.id.toString(),
      type: loadedUser.role.type,
      credit: loadedUser.credit
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    } //to de prevent forward error to user


    next(err);
  });
};

exports.getUserStatus = function (req, res, next) {
  _models["default"].User.findByPk(req.userId).then(function (user) {
    if (!user) {
      var error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: user.status
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};

exports.updateUserStatus = function (req, res, next) {
  var newStatus = req.body.status;

  _models["default"].User.findByPk(req.userId).then(function (user) {
    if (!user) {
      var error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    user.status = newStatus;
    return user.save();
  }).then(function (result) {
    res.status(200).json({
      message: "User updated."
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};
//# sourceMappingURL=auth.js.map