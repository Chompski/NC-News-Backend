const { Article, Comment, Topic, User } = require('../models');

function getTopics(req, res, next) {
    Topic
        .find({})
        .then(topics => {
            return res.status(200).send(topics);
        })
        .catch(next)
}

function getTopicArticles(req, res, next) {
    const id = req.params.topic_id
    Article
        .find({ belongs_to: id })
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(next)
}

function postTopicArticles(req, res, next) {
    const id = req.params.topic_id
    const { body, title } = req.body

    User
        .find({})
        .then(users => {
            const userID = users[0]._id

            Article
                .create({ title: title, belongs_to: id, body: body, created_by: userID })
                .then(article => {
                    return res.status(200).send(article);
                })
                .catch(next)
        })
}


module.exports = { getTopics, getTopicArticles, postTopicArticles }