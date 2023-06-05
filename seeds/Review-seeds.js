const { Review } = require('../models');

const reviewData = [
    {
        title: 'Test_Title', 
        review_content: 'Test Review Text Goes Here Fuckers',
        username: 'Prism1',
        user_id: "3"
    },
    {
        title: 'Test_Title 2', 
        review_content: 'Test Review Text Goes Here Fuckers 2',
        username: 'Prism1',
        user_id: "3"
    },
    {
        title: 'Test_Title 3', 
        review_content: 'Test Review Text Goes Here Fuckers 3',
        username: 'Prism1',
        user_id: "3"
    }
]

const seedReview = () => Review.bulkCreate(reviewData);

module.exports = seedReview;