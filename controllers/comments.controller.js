const { Article, Comment, Topic, User } = require('../models');

function updateCommentsIDVotes(req, res) {
    const id = req.params.comment_id
    const rate = req.query.vote

    if (rate === 'up') {
        Comment
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: 1 } }, {new: true})
            .then(comment => {
                return res.status(200).send(comment);
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (rate === 'down') {
        Comment
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: -1 } }, {new: true})
            .then(comment => {
                return res.status(200).send(comment);
            })
            .catch(err => {
                console.log(err)
            })
    }
}

function deleteCommentsID(req, res) {
    const id = req.params.comment_id
    Comment
        .findByIdAndRemove({ _id: id })
        .then(comment => {
            return res.status(200).send('File Deleted');
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = { updateCommentsIDVotes, deleteCommentsID }