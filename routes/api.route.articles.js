const express = require('express');
const router = express.Router();

const articlesCont = require('../controllers/articles.controller');

router.get('/', articlesCont.getArticles);
router.get('/:article_id', articlesCont.getArticlesID);
router.get('/:article_id/comments', articlesCont.getArticlesIDComments);
router.post('/:article_id/comments', articlesCont.postArticlesIDComments);
router.put('/:article_id', articlesCont.updateArticlesIDVotes);

module.exports = router;