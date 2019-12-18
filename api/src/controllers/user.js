import models from "../setup/models";
// const User = require("../models/user");
// const Address = require("../models/address");
// const Avatar = require("../models/avatar");

exports.postAvatar = (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageRef = req.files[0].path;
  models.Avatar.findOne({ where: { userId: req.userId } })
    .then(avatar => {
      if (avatar) {
        avatar.update({ imageRef: imageRef });
      } else {
        models.User.findByPk(req.userId).then(user => {
          models.Avatar.create({
            imageRef: imageRef
          }).then(avatar => {
            user.setAvatar(avatar);
            //User.update({AvatarId: avatar.id})
          });
        });
      }
    })
    .then(() => {
      res.status(201).json({
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
  models.User.findByPk(req.userId, {
    include: [
      {
        model: models.Avatar,
        attributes: ["imageRef"]
      },
      {
        model: models.Address
      }
    ]
  })
    .then(user => {
      user["password"] = undefined;
      if (!user) {
        const error = new Error("Not found.");
        error.statusCode = 404;
        throw error;
      } else if (user.addresses.length < 1) {
        user["addresses"] = undefined;
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
  models.User.findByPk(req.userId)
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
  models.Address.findOne({
    where: { userId: req.userId }
  })
    .then(address => {
      if (!address) {
        models.Address.create(req.body).then(address => {
          models.User.findByPk(req.userId).then(user => {
            return user.setAddresses(address);
          });
        });
      } else {
        return address.update(req.body);
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
  //models.Avatar.findByPk;
  models.User.findByPk(req.userId, {
    include: [
      {
        model: models.Avatar,
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
      if (user.Avatar && user.Avatar.imageRef) {
        res.status(200).json({
          Avatar: user.Avatar.imageRef
        });
      } else {
        res.status(200).json({
          Avatar: null
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
