const User = require("../models/user");
const Address = require("../models/address");
const Avatar = require("../models/avatar");

exports.postAvatar = (req, res, next) => {
  if (!req.files[0]) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageRef = req.files[0].path;
  User.findByPk(req.userId)
    .then(user => {
      Avatar.create({
        imageRef: imageRef
      }).then(avatar => {
        user.setAvatar(avatar);
        //User.update({AvatarId: avatar.id})
      });
    })
    .then(() => {
      res.status(200).json({
        imageRef: imageRef
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProfile = (req, res, next) => {
  User.findByPk(req.userId, {
    include: [
      {
        model: Avatar,
        attributes: ["imageRef"]
      },
      {
        model: Address
      }
    ]
  })
    .then(user => {
      user["password"] = undefined;
      if (!user) {
        const error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProfile = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      }
      user.update(req.body);
      user["password"] = undefined;
      res.status(200).json({
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateAdresse = (req, res, next) => {
  Address.findOne({
    where: { userId: req.userId }
  })
    .then(address => {
      if (!address) {
        Address.create(req.body).then(address => {
          User.findByPk(req.userId).then(user => {
            user.setAddress(address);
          });
        });
      } else {
        address.update(req.body);
      }
    })
    .then(address => {
      if (!address) {
        const error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        address: address
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAvatar = (req, res, next) => {
  Avatar.findByPk;
  User.findByPk(req.userId, {
    include: [
      {
        model: Avatar,
        attributes: ["imageRef"]
      }
    ]
  })
    .then(user => {
      if (!user) {
        const error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        Avatar: user.Avatar.imageRef
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
