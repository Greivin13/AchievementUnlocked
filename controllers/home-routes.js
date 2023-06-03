const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Review, Comment, revComment } = require("../models");

const scripts = [
  { script: "../assets/js/login.js" },
  { script: "../assets/js/logout.js" },
  { script: "../assets/js/index.js" },
  { script: "../assets/js/comment.js" },
  { script: "../assets/js/add-post.js" },
];

router.get("/", (req, res) => {
  console.log("New Request Recieved!");
  Post.findAll({
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
        scripts: scripts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/Discussion", (req, res) => {
  console.log("New Request Recieved!");
  Post.findAll({
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("discussion", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/Profile", (req, res) => {
  console.log("New Request Recieved!");
  Review.findAll({
    attributes: ["id", "review_content", "title", "created_at"],
    include: [
      {
        model: revComment,
        attributes: [
          "id",
          "revComment_text",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));

      res.render("profile", {
        reviews,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/Discussion", (req, res) => {
  console.log("New Request Recieved!");
  Post.findAll({
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("discussion", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/Profile", (req, res) => {
  console.log("New Request Recieved!");
  Review.findAll({
    attributes: ["id", "review_content", "title", "created_at"],
    include: [
      {
        model: revComment,
        attributes: ["id", "revComment_text", "review_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));

      res.render("profile", {
        reviews,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = postData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", { scripts: scripts });
});
router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("sign-up", {
    title: "Sign-up",
    scripts: scripts,
  });
});

module.exports = router;
