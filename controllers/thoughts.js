const { ObjectId } = require('mongoose').Types;
const { Reaction, Thoughts, User } = require('../models');


const headCount = async () => {
    const numberOfThoughts = await Thoughts.aggregate()
        .count('thoughtCount');
    return numberOfThoughts;
}

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
                .populate({
                    path: 'reactions',
                    select: '-_v'
                })
            const thoughtsCount = {
                thoughts,
                headcount: await headCount(),
            };
            res.json(thoughtsCount);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne(req.params.thoughtId)
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found'})
            }
            res.json({ thought });
        } catch (err) {
            res.status(500).json(err);
         }
    },

    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {thoughts: thought._id}});
            res.json(user, thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(res, req) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {new: true, runValidators: true});
            if (!thought) {
                console.error('Thought not found');
                return null;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found!' });
            }
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user found with thought'})
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            .populate({path: 'reactions', select: '-__v'})
            if (!thought) {
                return res.status(404).json({ message: 'No thought found!' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found!' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}