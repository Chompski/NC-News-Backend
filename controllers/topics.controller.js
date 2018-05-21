const {Article, Comment, Topic, User} = require('../models');

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
    .find({belongs_to:id})
    .then(articles => {
        return res.status(200).send(articles);
    })
    .catch(err => {
        console.log(err)
    })
}


module.exports = {getTopics, getTopicArticles}