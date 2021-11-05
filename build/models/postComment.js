"use strict";

module.exports = function (sequelize, DataTypes) {
  var PostComment = sequelize.define("postComment", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    imageRef: DataTypes.STRING
  });

  PostComment.associate = function (models) {
    PostComment.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
  };

  return PostComment;
};
//# sourceMappingURL=postComment.js.map