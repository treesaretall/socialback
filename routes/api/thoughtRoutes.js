const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts');

// /api/thoughts
router.route('/')
    .get(getThoughts);
    

router.route('/:userId')
    .post(createThought);


router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
