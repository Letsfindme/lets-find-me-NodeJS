const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import models from "../setup/models";
import serverConfig from "../config/server.json";

exports.signup = (req, res, next) => {
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
  const ROLETYPE = "User";
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const User = new models.User({
        email: email,
        password: hashedPw,
        username: username
      });
      return User.save();
    })
    .then(User => {
      models.Role.findOne({
        where: {
          type: ROLETYPE
        }
      }).then(role => {
        return User.setRole(role);
      });
      return User;
    })
    .then(user =>
      res.status(201).json({
        message: "User created!",
        userId: user._id
      })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  models.User.findAll({
    where: {
      email: email
    },
    include: [
      {
        model: models.Role,
        attributes: ["type"]
      }
    ]
  })
    .then(user => {
      if (!user[0]) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user[0];
      return bcrypt.compare(password, user[0].password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
          type: loadedUser.role.type,
          credit: loadedUser.credit,
        },
        serverConfig.secret,
        {
          expiresIn: "240h"
        }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser.id.toString(),
        type: loadedUser.role.type,
        credit: loadedUser.credit,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      //to de prevent forward error to user
      next(err);
    });
};

exports.getUserStatus = (req, res, next) => {
  models.User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        status: user.status
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;
  models.User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: "User updated."
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
