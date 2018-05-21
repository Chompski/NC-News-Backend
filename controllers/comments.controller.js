const { Article, Comment, Topic, User } = require('../models');

function updateCommentsIDVotes(req, res, next) {
    const id = req.params.comment_id
    const rate = req.query.vote

    if (rate === 'up') {
        Comment
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: 1 } }, { new: true })
            .then(comment => {
                return res.status(200).send(comment);
            })
            .catch(next)
    }
    
    if (rate === 'down') {
        Comment
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: -1 } }, { new: true })
            .then(comment => {
                return res.status(200).send(comment);
            })
            .catch(next)
    }
}

function deleteCommentsID(req, res, next) {
    const id = req.params.comment_id
    Comment
        .findByIdAndRemove({ _id: id })
        .then(comment => {
            return res.status(200).send('File Deleted');
        })
        .catch(next)
}

module.exports = { updateCommentsIDVotes, deleteCommentsID }