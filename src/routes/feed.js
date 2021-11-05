const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/authentication");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);
/*
 * Get posts by user
 * /feed/user-posts/
 */
router.get("/user-posts/",isAuth, feedController.getPosts);

router.get("/post/:postId", feedController.getPost);
router.post("/post/:postId", isAuth, feedController.addComment);
router.post("/post/:postId/:postRate", isAuth, feedController.addRate);

/**
 * Get Top noted feeds for home
 * /feed/topfeed
 */
router.get("/topfeed", feedController.getTopFeed);
router.get("/topsearch", feedController.getTopSearchFeed);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

// Search for posts /feed/search
router.get("/search", feedController.searchPost);

router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
