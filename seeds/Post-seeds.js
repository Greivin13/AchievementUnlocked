const { Post } = require('../models');

const postData = [
    {
        title: 'Test_Title', 
        review_content: 'Test Review Text Goes Here Fuckers',
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;