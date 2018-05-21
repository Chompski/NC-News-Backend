const express = require('express');
const router = express.Router();

const articlesCont = require('../controllers/articles.controller');

router.get('/', articlesCont.getArticles);
router.get('/:article_id', articlesCont.getArticlesID);
// router.post('/:topic_id/articles', topicsCont.postTopicArticles)


module.exports = router;