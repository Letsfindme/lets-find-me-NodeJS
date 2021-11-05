"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _models = _interopRequireDefault(require("../setup/models"));

exports.postAvatar = function (req, res, next) {
  if (!req.files || req.files.length == 0) {
    var error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  var imageRef = req.files[0].path;

  _models["default"].Avatar.findOne({
    where: {
      userId: req.userId
    }
  }).then(function (avatar) {
    if (avatar) {
      avatar.update({
        imageRef: imageRef
      });
    } else {
      _models["default"].User.findByPk(req.userId).then(function (user) {
        _models["default"].Avatar.create({
          imageRef: imageRef
        }).then(function (avatar) {
          user.setAvatar(avatar); //User.update({AvatarId: avatar.id})
        });
      });
    }
  }).then(function () {
    res.status(201).json({
      imageRef: imageRef
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};

exports.getProfile = function (req, res, next) {
  try {
    _models["default"].User.findByPk(req.userId, {
      include: [{
        model: _models["default"].Avatar,
        attributes: ["imageRef"]
      }, {
        model: _models["default"].Address
      }]
    }).then(function (user) {
      user["password"] = undefined;

      if (!user) {
        var error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      } else if (user.addresses.length < 1) {
        user["addresses"] = undefined;
      }

      res.status(200).json({
        user: user
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  } catch (error) {}
};

exports.updateProfile = function (req, res, next) {
  _models["default"].User.findByPk(req.userId).then(function (user) {
    if (!user) {
      var error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }

    user.update(req.body);
    user["password"] = undefined;
    res.status(200).json({
      user: user
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};

exports.updateAdresse = function (req, res, next) {
  _models["default"].Address.findOne({
    where: {
      userId: req.userId
    }
  }).then(function (address) {
    if (!address) {
      _models["default"].Address.create(req.body).then(function (address) {
        _models["default"].User.findByPk(req.userId).then(function (user) {
          return user.setAddresses(address);
        });
      });
    } else {
      return address.update(req.body);
    }
  }).then(function (address) {
    if (!address) {
      var error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      address: address
    });
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};

exports.getAvatar = function (req, res, next) {
  //models.Avatar.findByPk;
  _models["default"].User.findByPk(req.userId, {
    include: [{
      model: _models["default"].Avatar,
      attributes: ["imageRef"]
    }]
  }).then(function (user) {
    if (!user) {
      return res.status(202).json({
        Avatar: null
      }); // const error = new Error("Not found.");
      // error.statusCode = 404;
      // throw error;
    } else if (user.Avatar && user.Avatar.imageRef) {
      return res.status(200).json({
        Avatar: user.Avatar.imageRef
      });
    } else {
      return res.status(200).json({
        Avatar: null
      });
    }
  })["catch"](function (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  });
};
//# sourceMappingURL=user.js.map