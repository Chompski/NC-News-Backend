const mongoose = require('mongoose');
const {articlesData, commentsData, topicsData, usersData} = require('./devData')
const seedDB = require('./seed')
const {DB_url} = require('../config')

mongoose.connect(DB_url)
.then(() => {

   return seedDB(articlesData, commentsData, topicsData, usersData)

})
.then(([commentDocs, articleDocs, topicDocs, userDocs]) => {
    console.log (`Added ${commentDocs.length} comments, ${articleDocs.length} articles, ${topicDocs.length} topics and ${userDocs.length} users`)
    return mongoose.disconnect()
})