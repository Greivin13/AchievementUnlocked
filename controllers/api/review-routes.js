const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Review, User, revComment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
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
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((reviewData) => res.json(reviewData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
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
      if (!reviewData) {
        res.status(404).json({ message: "No Review found containing this id" });
        return;
      }
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Review.create({
    title: req.body.title,
    review_content: req.body.review_content,
    user_id: 3,
  })
    .then((reviewData) => res.json(reviewData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Review.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((reviewData) => {
      if (!reviewData) {
        res.status(404).json({ message: "No review found containing this id" });
        return;
      }
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.delete('/:id', withAuth, (req, res) => {
//   console.log("id", req.params.id);
//   Post.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(postData => {
//       if (!postData) {
//         res.status(404).json({ message: "No post found containing this id" });
//         return;
//       }
//       res.json(postData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
