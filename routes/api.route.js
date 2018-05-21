const express = require('express');
const router = express.Router();

const topicsRoute = require('./api.route.topics');
const articlesRoute = require('./api.route.articles');
const commentsRoute = require('./api.route.comments');
const usersRoute = require('./api.route.users');

router.use('/topics', topicsRoute );

router.use('/articles', articlesRoute);

router.use('/comments', commentsRoute);

router.use('/users', usersRoute);


module.exports = router;