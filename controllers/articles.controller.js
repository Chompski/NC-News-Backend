const { Article, Comment, Topic, User } = require('../models');

function getArticles(req, res, next) {
    Article
        .find().lean()
        .then(articles => {

        const promises = articles.map(article =>  Comment.count({ belongs_to: article._id }))
            return Promise.all([articles, ...promises])     
        }).then(([articles,...counts])=> {
             articles.forEach((article, i) => {
                 article.comment_count = counts[i]
             });
             res.status(200).send(articles);
        })
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 article not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
        })
}

function getArticlesID(req, res, next) {
    const id = req.params.article_id
    Article
        .findById(id)
        .then(articles => {
            if (articles === null) throw {status:404}
            return res.status(200).send(articles);
        })
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 article not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
        })
}

function getArticlesIDComments(req, res, next) {
    const id = req.params.article_id
    Comment
        .find({ belongs_to: id })
        .then(comments => {
            return res.status(200).send(comments);
        })
        .catch(error =>{
            if (error.status === 404) return next({status:404, message:'404 article not found'})
            if (error.name === "CastError") return next({status:400, message:'400 bad request'})
        })
}

function postArticlesIDComments(req, res, next) {
    const id = req.params.article_id
    const { body } = req.body

    User
        .find()
        .then(users => {
            const userID = users[0]._id

            Comment
                .create({ belongs_to: id, body: body, created_by: userID })
                .then(comment => {
                    return res.status(200).send(comment);
                })
                .catch(error =>{
                    if (error.status === 404) return next({status:404, message:'404 article not found'})
                    if (error.name === "CastError") return next({status:400, message:'400 bad request'})
                    if (error.name === "ValidationError") return next({status:400, message:'400 bad request'})
                })
        })
}

function updateArticlesIDVotes(req, res, next) {
    const id = req.params.article_id
    const rate = req.query.vote

    let amount = 0

    if (rate === "up") amount = 1
    if (rate === "down") amount = -1

        Article
            .findByIdAndUpdate( id, { $inc: { votes: amount } }, { new: true })
            .then(article => {
                return res.status(200).send(article);
            })
            .catch(error =>{
                if (error.status === 404) return next({status:404, message:'404 article not found'})
                if (error.name === "CastError") return next({status:400, message:'400 bad request'})
            })
}

module.exports = { getArticles, getArticlesID, getArticlesIDComments, postArticlesIDComments, updateArticlesIDVotes }