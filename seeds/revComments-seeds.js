const { revComment } = require('../models');

const revCommentData = [
    {
        title: 'Test_Title', 
        revComment_text: 'Test Review Text Goes Here Fuckers',
        username: 'Rin'
    },
    {
        title: 'Test_Title 2', 
        revComment_text: 'Test Review Text Goes Here Fuckers 2',
        username: 'Rin'
    },
    {
        title: 'Test_Title 3', 
        revComment_text: 'Test Review Text Goes Here Fuckers 3',
        username: 'Rin'
    }
]

const seedRevComments = () => revComment.bulkCreate(revCommentData);

module.exports = seedRevComments;