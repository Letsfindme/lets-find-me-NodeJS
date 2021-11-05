"use strict";

module.exports = function (sequelize, DataTypes) {
  var Avatar = sequelize.define("Avatar", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    imageRef: DataTypes.STRING
  });
  return Avatar;
};
//# sourceMappingURL=avatar.js.map