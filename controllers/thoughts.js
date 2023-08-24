const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');


const headCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('thoughtCount');
    return numberOfThoughts;
}

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
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
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
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
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: thought._id } });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {new: true, runValidators: true});
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
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found!' });
            }
            const user = await User.findOneAndUpdate(
                { username: thought.username },
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
            const thought = await Thought.findOneAndUpdate(
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
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
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