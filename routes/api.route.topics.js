const express = require('express');
const router = express.Router();

const topicsCont = require('../controllers/topics.controller');

router.get('/', topicsCont.getTopics);
router.get('/:topic_id/articles', topicsCont.getTopicArticles);


module.exports = router;