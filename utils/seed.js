const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

// User Data
const userSeed = [
    {
        username: 'Matt',
        email: 'Matt@gmail.com',
    },
    {
        username: 'Liz',
        email: 'Liz@gmail.com',
    },
    {
        username: 'Jeff',
        email: 'Jeff@gmail.com',
    },
    {
        username: 'Phantom',
        email: 'phantom@gmail.com',
    },
];


connection.once('open', async () => {
    await User.deleteMany({});

    await User.collection.insertMany(userSeed);
    console.log('SUCCESSFULLY SEEDED USERS');

    process.exit(0);
})