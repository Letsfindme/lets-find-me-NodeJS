'use strict'
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    username: Sequelize.STRING,
    country: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    firstConnection: Sequelize.DATE,
    lastConnection: Sequelize.DATE,
    avatar: Sequelize.BOOLEAN,
    // TIMESTAMP WITH TIME ZONE for postgres,
    createdDate: Sequelize.DATE,
    birthday: Sequelize.DATE,
    age: Sequelize.INTEGER,
    credit: Sequelize.INTEGER,
    status: Sequelize.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Address);
    User.hasOne(models.Avatar);
    User.hasOne(models.Cart);
    User.hasMany(models.Order);
    User.belongsTo(models.Role);
    //todo
    User.belongsToMany(models.Post, { through: models.PostRate });
  };

  return User;
};
