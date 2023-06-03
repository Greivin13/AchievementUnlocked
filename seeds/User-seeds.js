const { User } = require('../models');

const userData = [
    {
        username: 'Prism', 
        email: 'Bwhitman33@gmail.com',
        password: 'password123',
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;