const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v');
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
            const user = await User.findOne({ _id: req.params.userId })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })

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

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {new: true, runValidators: true});
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
        console.log(req);
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found!' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            return res.status(200).json({
            message: "User and their thoughts deleted!",
          });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}