const { Review } = require('../models');

const reviewData = [
    {
        title: 'Test_Title', 
        review_content: 'Test Review Text Goes Here Fuckers',
        username: 'Prism'
    },
    {
        title: 'Test_Title 2', 
        review_content: 'Test Review Text Goes Here Fuckers 2',
        username: 'Prism'
    },
    {
        title: 'Test_Title 3', 
        review_content: 'Test Review Text Goes Here Fuckers 3',
        username: 'Prism'
    }
]

const seedReview = () => Review.bulkCreate(reviewData);

module.exports = seedReview;