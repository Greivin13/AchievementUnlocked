const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Review, Comment, revComment } = require("../models");

const scripts = [
  { script: "../assets/js/login.js" },
  { script: "../assets/js/logout.js" },
  { script: "../assets/js/index.js" },
  { script: "../assets/js/comment.js" },
  { script: "../assets/js/add-post.js" },
  { script: "../assets/js/homepage.js" },
  { script: "../assets/js/profile.js" },
];

router.get("/", async (req, res) => {
  console.log(req.session.logged_in)
  try {
    const user_materials = await User.findAll({
      attributes: {
        exclude: [
          'id',
          'username',
          'email',
          'password'
        ],

      },
      include:[{model: Review}, {model: Post}]
    });
    const reviews = user_materials.map((review)=> review.get({plain:true}))
    console.log(JSON.stringify(reviews))
    const loggedIn = req.session.logged_in
      res.render('homepage', {
        reviews,
        loggedIn
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

  // Post.findAll({
  //   attributes: ["id", "post_content", "title", "created_at"],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
  //       include: {
  //         model: User,
  //         attributes: ["username"],
  //       },
  //     },
  //   ],
  // })
  //   .then((postData) => {
  //     const posts = postData.map((post) => post.get({ plain: true }));
  //     console.log(req.session.username);
  //     res.render("homepage", {
  //       posts,
  //       loggedIn: req.session.loggedIn,
  //       scripts: scripts,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });


// router.get("/Discussion", (req, res) => {
//   console.log("New Request Recieved!");
//   Post.findAll({
//     attributes: ["id", "post_content", "title", "created_at"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then(postData => {
//       const posts = postData.map((post) => post.get({ plain: true }));

//       res.render("discussion", {
//         posts,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
        exclude: [
        'password', 
        'email', 
        'id'
      ],

    },
    include: [{model: Review}, {model: Post}]

// router.get("/profile", (req, res) => {
//   console.log("New Request Recieved!");
//   Review.findAll({
//     attributes: ["id", "review_content", "title", "created_at"],
//     include: [
//       {
//         model: revComment,
//         attributes: [
//           "id",
//           "revComment_text",
//           "review_id",
//           "user_id",
//           "created_at",
//         ],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then((reviewData) => {
//       // const reviews = reviewData.map((review) => review.get({ plain: true }));
//       // for (let i = 0; i < reviewData.length; i++) {
//       //   console.log(reviewData[i]);
//       // }
//       let displayData = {};
//       reviewData.forEach((review) => {
//         // displayData.push(review.get({ plain: true }));
//         displayData[review.get({ plain: true }).id] = review.get({
//           plain: true,
//         });
//       });
//       console.log(displayData);
//       res.render("profile", displayData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);

    });
    const loggedIn = req.session.logged_in
    const user = req.session.user_id
    const userProfile = user_activity.get({plain:true})
    console.log(JSON.stringify(userProfile))
      res.render('profile', {
      userProfile,
      loggedIn,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
}});

//   User.findAll({
//     attributes: ["id", "review_content", "title", "created_at"],
//     include: [
//       {
//         model: revComment,
//         attributes: [
//           "id",
//           "revComment_text",
//           "review_id",
//           "user_id",
//           "created_at",
//         ],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then((reviewData) => {
//       // const reviews = reviewData.map((review) => review.get({ plain: true }));

//       res.render("profile", {
//         reviews: reviewData[0].title,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
