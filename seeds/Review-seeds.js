const { Review } = require("../models");

const reviewData = [
  {
    title: "Test_Title",
    review_content: "Test Review Text Goes Here Fuckers",
    username: "Prism",
  },
];

const seedReview = () => Review.bulkCreate(reviewData);

module.exports = seedReview;
