const { ObjectId } = require('mongoose').Types;
const { Reaction, Thoughts, User } = require('../models');

// const headCount = async () => {
//     const numberOfUsers = await User.aggregate()
//         .count('userCount');
//     return numberOfUsers;
// }

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            const usersCount = {
                users,
                headcount: await headCount(),
            };
            res.json(usersCount);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne(req.params._id)

            if (!user) {
                return res.status(404).json({ message: 'User not found'})
            }
            res.json({ user });
        } catch (err) {
            res.status(500).json(err);
         }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(res, req) {
        try {
            const user = await User.findOneAndUpdate(req.params._id);
            if (!user) {
                console.error('User not found');
                return null;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params._id });

            if (!user) {
                return res.status(404).json({ message: 'No user found!' });
            }
            res.json({ message: 'User deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}