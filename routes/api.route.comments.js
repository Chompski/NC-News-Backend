const express = require('express');
const router = express.Router();

const commentsCont = require('../controllers/comments.controller');

router.put('/:comment_id', commentsCont.updateCommentsIDVotes);
router.delete('/:comment_id', commentsCont.deleteCommentsID)

module.exports = router;