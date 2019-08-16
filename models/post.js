const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Post = sequelize.define('post', {
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

  // @OneToMany(cascade = CascadeType.REMOVE)
  // @JoinColumn(name = "comments")
  // private List<Comment> comments;


  // @OneToMany(cascade = CascadeType.REMOVE)
  //   @JoinColumn(name = "post_id")
  //   private List<PostLike> postLikes;
});

module.exports = Post;