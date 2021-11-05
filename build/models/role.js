"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    Model = _require.Model,
    DataTypes = _require.DataTypes;

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define("role", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    type: Sequelize.STRING
  }, {
    timestamps: false
  });
  return Role;
};
//# sourceMappingURL=role.js.map