const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Review = require('./Review');
const revComment = require('./revComment')

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

revComment.belongsTo(User, {
    foreignKey: 'user_id'
});

revComment.belongsTo(Review, {
    foreignKey: 'review_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

User.hasMany(revComment, {
    foreignKey: 'user_id',
});

Review.hasMany(revComment, {
    foreignKey: 'review_id'
})

module.exports = { User, Post, Review, Comment, revComment };