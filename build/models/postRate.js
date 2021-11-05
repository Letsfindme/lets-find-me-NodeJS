"use strict";

module.exports = function (sequelize, DataTypes) {
  var PostRate = sequelize.define("postRate", {
    // id: {
    //   type: Sequelize.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultValue: Sequelize.UUIDV4
    // },
    rate: DataTypes.INTEGER
  });
  return PostRate;
};
//# sourceMappingURL=postRate.js.map