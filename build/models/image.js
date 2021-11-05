"use strict";

module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    imageRef: DataTypes.STRING
  });

  Image.associate = function (models) {
    Image.belongsTo(models.Post);
  };

  return Image;
};
//# sourceMappingURL=image.js.map