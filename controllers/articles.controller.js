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

// function postTopicArticles(req, res) {
//     const id = req.params.topic_id
//     const { body, title } = req.body

//     User
//         .find({})
//         .then(users => {
//             const userID = users[0]._id

//             Article
//                 .create({ title: title, belongs_to: id, body: body, created_by: userID })
//                 .then(article => {
//                     return res.status(200).send(article);
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         })
// }


module.exports = { getArticles, getArticlesID }