const mongoose = require('mongoose');
const {articlesData, commentsData, topicsData, usersData} = require('./devData')
const seedDB = require('./seed')

mongoose.connect('mongodb://localhost:27017/northnewsDB')
.then(() => {

   return seedDB(articlesData, commentsData, topicsData, usersData)

})
.then(([commentDocs, articleDocs, topicDocs, userDocs]) => {
    console.log (`Added ${commentDocs.length} comments, ${articleDocs.length} articles, ${topicDocs.length} topics and ${userDocs.length} users`)
    return mongoose.disconnect()
})