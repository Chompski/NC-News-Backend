const { Article, Comment, Topic, User } = require('../models');

function getTopics(req, res, next) {
    Topic
        .find()
        .then(topics => {
            return res.status(200).send(topics);
        })
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 topic not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
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
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 topic not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
            if (error.name === "ValidationError") return next({status:400, message:'400 bad request'})
        })
}

function postTopicArticles(req, res, next) {
    const id = req.params.topic_id
    const { body, title } = req.body

    User
        .find()
        .then(users => {
            const userID = users[0]._id

            Article
                .create({ title: title, belongs_to: id, body: body, created_by: userID })
                .then(article => {
                    return res.status(200).send(article);
                })
                .catch(error =>{
                    if (error.status === 404) return next({status:404, message:'404 topic not found'});
                    if (error.name === "CastError") return next({status:400, message:'400 bad request'});
                    if (error.name === "ValidationError") return next({status:400, message:'400 bad request'})
                })
        })
}


module.exports = { getTopics, getTopicArticles, postTopicArticles }