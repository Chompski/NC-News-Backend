const { Article, Comment, Topic, User } = require('../models');

function getArticles(req, res, next) {
    Article
        .find()
        .populate('created_by')
        .populate('belongs_to')
        .lean()
        .then(articles => {

            const promises = articles.map(article => Comment.count({ belongs_to: article._id }))
            return Promise.all([articles, ...promises])
        }).then(([articles, ...counts]) => {
            articles.forEach((article, i) => {
                article.comment_count = counts[i]
            });
            res.status(200).send(articles);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 article not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
        })
}

function getArticlesID(req, res, next) {
    const id = req.params.article_id
    Article
        .findById(id)
        .populate('created_by')
        .populate('belongs_to')
        .then(articles => {
            if (articles === null) throw { status: 404 }
            return res.status(200).send(articles);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 article not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
        })
}

function getArticlesIDComments(req, res, next) {
    const id = req.params.article_id
    Comment
        .find({ belongs_to: id })
        .populate('created_by')
        .populate('belongs_to')
        .then(comments => {
            return res.status(200).send(comments);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 article not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
        })
}

function postArticlesIDComments(req, res, next) {
    const belongs_to = req.params.article_id
    const { body } = req.body

    User
        .findOne()
        .then(user => {
            const created_by = user._id

            return Promise.all([Comment
                .create({ belongs_to, body, created_by }), user])

        })
        .then(([comment, user]) => {
            return res.status(200).send({ ...comment.toObject(), created_by: user });
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 article not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
            if (error.name === "ValidationError") return next({ status: 400, message: '400 bad request' })
        })
}

function updateArticlesIDVotes(req, res, next) {
    const id = req.params.article_id
    const rate = req.query.vote

    let amount = 0

    if (rate === "up") amount = 1
    if (rate === "down") amount = -1

    Article
        .findByIdAndUpdate(id, { $inc: { votes: amount } }, { new: true })
        .then(article => {
            return res.status(200).send(article);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 article not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
        })
}

module.exports = { getArticles, getArticlesID, getArticlesIDComments, postArticlesIDComments, updateArticlesIDVotes }