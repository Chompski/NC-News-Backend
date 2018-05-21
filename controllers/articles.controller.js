const { Article, Comment, Topic, User } = require('../models');

function getArticles(req, res) {
    Article
        .find({})
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(err => {
            console.log(err)
        })
}

function getArticlesID(req, res) {
    const id = req.params.article_id
    Article
        .findById(id)
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(err => {
            console.log(err)
        })
}

function getArticlesIDComments(req, res) {
    const id = req.params.article_id
    Comment
        .find({ belongs_to: id })
        .then(comments => {
            return res.status(200).send(comments);
        })
        .catch(err => {
            console.log(err)
        })
}

function postArticlesIDComments(req, res) {
    const id = req.params.article_id
    const { body } = req.body

    User
        .find({})
        .then(users => {
            const userID = users[0]._id

            Comment
                .create({ belongs_to: id, body: body, created_by: userID })
                .then(comment => {
                    return res.status(200).send(comment);
                })
                .catch(err => {
                    console.log(err)
                })
        })

}

function updateArticlesIDVotes(req, res) {
    const id = req.params.article_id
    const rate = req.query.vote

    if (rate === 'up') {
        Article
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: 1 } }, {new: true})
            .then(article => {
                return res.status(200).send(article);
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (rate === 'down') {
        Article
            .findByIdAndUpdate({ _id: id }, { $inc: { votes: -1 } }, {new: true})
            .then(article => {
                return res.status(200).send(article);
            })
            .catch(err => {
                console.log(err)
            })
    }
}


module.exports = { getArticles, getArticlesID, getArticlesIDComments, postArticlesIDComments, updateArticlesIDVotes }