const mongoose = require('mongoose');
const {Article, Comment, Topic, User} = require('../models')

function seedDB (articlesData, commentsData, topicsData, usersData) {
   
    return  mongoose.connection.dropDatabase()
        .then(() => {
            console.log('dropped')

            return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])

        }).then(([topicDocs, userDocs]) => {
           
            articlesData.forEach(article => {
                article.belongs_to = topicDocs.find(topic => topic.slug === article.topic)._id
                article.created_by = userDocs.find(user => user.username === article.created_by)._id
            });

    
         return Promise.all([Article.insertMany(articlesData), topicDocs, userDocs])

        }).then(([articleDocs, topicDocs, userDocs])  => {

            commentsData.forEach(comment => {
                comment.belongs_to = articleDocs.find(article => article.title === comment.belongs_to)._id
                comment.created_by = userDocs.find(user => user.username === comment.created_by)._id
            });

            return Promise.all([Comment.insertMany(commentsData), articleDocs, topicDocs, userDocs])

        }).catch(console.log)
   
}

module.exports = seedDB