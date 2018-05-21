const { Article, Comment, Topic, User } = require('../models');

function getTopics(req, res) {
    Topic
        .find({})
        .then(topics => {
            return res.status(200).send(topics);
        })
        .catch(err => {
            console.log(err)
        })
}

function getTopicArticles(req, res) {
    const id = req.params.topic_id
    Article
        .find({ belongs_to: id })
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(err => {
            console.log(err)
        })
}

function postTopicArticles(req, res) {
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
                .catch(err => {
                    console.log(err)
                })
        })
}


module.exports = { getTopics, getTopicArticles, postTopicArticles }