const { User } = require('../models');

const userData = [
    {
        username: 'Prism', 
        email: 'Bwhitman33@gmail.com',
        password: 'password123',
    },
    {
        username: 'Rin',
        email: 'Thisisfake1@gmail.com',
        password: 'pass123',
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;