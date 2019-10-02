const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator/check");

const Post = require("../models/post");
const User = require("../models/user");
const Image = require("../models/image");
const Comment = require("../models/postComment");
const Avatar = require("../models/avatar");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  console.log("currentPage currentPagecurrentPagecurrentPage", currentPage);

  const perPage = 2;
  let totalItems;
  Post.findAll()
    .then(posts => {
      res.status(200).json({
        message: "Fetched posts successfully.",
        posts: posts,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/*
 * Create a new comment for exesting post
 */
exports.addComment = (req, res, next) => {
  const errors = validationResult(req);
  const postId = req.params.postId;
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const comment = req.body.text;
  console.log(req.body.text);

  let imageRef;
  User.findByPk(req.userId, {
    include: [
      {
        model: Avatar,
        attributes: ["imageRef"]
      }
    ]
  })
    .then(user => (imageRef = user.Avatar.imageRef))
    .then(imageRef =>
      Comment.create({
        text: comment,
        imageRef: imageRef,
        userId: req.userId,
        postId: postId
      })
    )
    .then(comment => { })
    .then(comment => {
      res.status(201).json({
        message: "Comment created successfully!",
        comment: comment,
        userId: req.userId
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.files[0]) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let auther;
  User.findByPk(req.userId).then(user => (auther = user.username));
  Post.create({
    title: title,
    content: content,
    userId: req.userId,
    auther: auther,
    imageUrl: req.files[0].path
  })
    .then(post => {
      req.files.map(file => {
        Image.create({
          imageRef: file.path
        }).then(image => {
          image.setPost(post);
        });
      });
      // ,
      // Post.update({
      //   imageUrl: req.files[0].path
      // }, {
      //   where: {
      //     id: post.id
      //   }
      // })
    })
    .then(post => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
        userId: req.userId,
        auther: auther
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId, {
    include: [
      {
        model: Image,
        attributes: ["imageRef"]
      },
      {
        model: User,
        attributes: ["username"],
        include: [
          {
            model: Avatar,
            attributes: ["imageRef"]
          }
        ]
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      }
    ]
  })
    .then(post => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post fetched.",
        post: post
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/**
 * Get Top noted feeds for home
 */
exports.getTopFeed = (req, res, next) => {
  // var t5 = mydata.slice(0,5);
  Post.findAll({
    limit: 4
    , include: [
      {
        model: Image,
        attributes: ["imageRef"]
      },
      {
        model: User,
        attributes: ["username"],
        include: [
          {
            model: Avatar,
            attributes: ["imageRef"]
          }
        ]
      }
    ]
  })
    .then(posts => {
      res.status(200).json({
        message: "Fetched top posts successfully.",
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/*
 * update exesting post
 */
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  Post.findByPk(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Post updated!",
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Deleted post."
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => console.log(err));
};
