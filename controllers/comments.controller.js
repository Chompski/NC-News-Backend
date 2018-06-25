const { Article, Comment, Topic, User } = require('../models');

function updateCommentsIDVotes(req, res, next) {
    const id = req.params.comment_id
    const rate = req.query.vote

    let amount = 0

    if (rate === "up") amount = 1
    if (rate === "down") amount = -1

        Comment
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: amount } }, { new: true })
            .then(comment => {
                return res.status(200).send(comment);
            })
            .catch(error =>{
                if (error.status === 404) return next({status:404, message:'404 comment not found'})
                if (error.name === "CastError") return next({status:400, message:'400 bad request'})
            })
}

function deleteCommentsID(req, res, next) {
    const id = req.params.comment_id
    Comment
        .findByIdAndRemove( id )
        .then(comment => {
            return res.status(200).send('File Deleted');
        })
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 comment not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
        })
}

module.exports = { updateCommentsIDVotes, deleteCommentsID }