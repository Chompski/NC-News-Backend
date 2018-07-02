const { Article, Comment, Topic, User } = require('../models');

function getTopics(req, res, next) {
    Topic
        .find()
        .then(topics => {
            return res.status(200).send(topics);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 topic not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
        })
}

function getTopicArticles(req, res, next) {
    const id = req.params.topic_id
    Article
        .find({ belongs_to: id })
        .populate('created_by')
        .populate('belongs_to')
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 topic not found' })
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' })
            if (error.name === "ValidationError") return next({ status: 400, message: '400 bad request' })
        })
}

function postTopicArticles(req, res, next) {
    const belongs_to = req.params.topic_id
    const { body, title } = req.body

    User
        .findOne()
        .then(user => {
            const created_by = user._id

            return Promise.all([Article
                .create({title, belongs_to, body, created_by }),user])
        })
        .then(([article, user]) => {
            return res.status(200).send({...article.toObject(),created_by:user});
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message: '404 topic not found' });
            if (error.name === "CastError") return next({ status: 400, message: '400 bad request' });
            if (error.name === "ValidationError") return next({ status: 400, message: '400 bad request' })
        })
}


module.exports = { getTopics, getTopicArticles, postTopicArticles }