"use strict";

module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("post", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    starCount: DataTypes.DOUBLE,
    category: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    content: DataTypes.STRING,
    author: DataTypes.STRING
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Address, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Post.hasMany(models.PostComment);
    Post.hasMany(models.Image);
  };

  return Post;
};
//# sourceMappingURL=post.js.map