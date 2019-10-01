const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");
const PostRate = require("./postRate");
const Image = require("./image");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  title: Sequelize.STRING,
  starCount: Sequelize.DOUBLE,
  category: Sequelize.STRING,
  creationDate: Sequelize.DATE,
  imageUrl: Sequelize.STRING,
  content: Sequelize.STRING,
  author: Sequelize.STRING
});

// Post.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE"
// });
// Post.hasMany(PostRate, {
//   onDelete: "CASCADE"
// });
// Post.hasMany(Image, {
//   constraints: true,
//   onDelete: "CASCADE"
// });

module.exports = Post;
