const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Review, Comment, revComment } = require("../models");

const scripts = [
  { script: "../js/login.js" },
  { script: "../js/logout.js" },
  { script: "../js/index.js" },
  { script: "../js/comment.js" },
  { script: "../js/add-post.js" },
  { script: "../js/homepage.js" },
  { script: "../js/profile.js" },
];

router.get("/", async (req, res) => {
  console.log(req.session.logged_in);
  try {
    const user_materials = await User.findAll({
      attributes: {
        exclude: ["id", "email", "password"],
      },
      include: [{ model: Review }, { model: Post }],
    });
    const reviews = user_materials.map((review) => review.get({ plain: true }));
    console.log(JSON.stringify(reviews));
    const loggedIn = req.session.logged_in;
    res.render("homepage", {
      reviews,
      loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// // const test = [
// //   {
// //     response: {
// //       players: [
// //         {
// //           steamid: "76561198054586238",
// //           communityvisibilitystate: 3,
// //           profilestate: 1,
// //           personaname: "Rin",
// //           profileurl: "https://steamcommunity.com/profiles/76561198054586238/",
// //           avatar:
// //             "https://avatars.steamstatic.com/c13dac9ba00a478e31d27413786eba95a49f70df.jpg",
// //           avatarmedium:
// //             "https://avatars.steamstatic.com/c13dac9ba00a478e31d27413786eba95a49f70df_medium.jpg",
// //           avatarfull:
// //             "https://avatars.steamstatic.com/c13dac9ba00a478e31d27413786eba95a49f70df_full.jpg",
// //           avatarhash: "c13dac9ba00a478e31d27413786eba95a49f70df",
// //           personastate: 0,
// //           primaryclanid: "103582791429521408",
// //           timecreated: 1324070000,
// //           personastateflags: 0,
// //           loccountrycode: "US",
// //         },
// //       ],
// //     },
// //   },
// // ];

// // router.get("/profile", async (req, res) => {
// //   return res.render("profile", test[req.params.id]);
// // });

router.get("/profile", async (req, res) => {
  try {
    const user_activity = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password", "email", "id"],
      },
      include: [{ model: Review }, { model: Post }],
    });
    const loggedIn = req.session.logged_in;
    const user = req.session.user_id;
    const userProfile = user_activity.get({ plain: true });
    console.log(JSON.stringify(userProfile));
    res.render("profile", {
      userProfile,
      loggedIn,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
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
  console.log(req.session.loggedIn);
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

router.get("/create-review", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("create-review", {
    title: "create-review",
    scripts: scripts,
  });
});

module.exports = router;
