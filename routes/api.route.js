const express = require('express');
const router = express.Router();

const topicsRoute = require('./api.route.topics');
const articlesRoute = require('./api.route.articles');
// const teams = require('./api.route.teams');
// const circuits = require('./api.route.circuits');


router.use('/topics', topicsRoute );

router.use('/articles', articlesRoute);

// router.use('/teams', teams);

// router.use('/circuits', circuits);


module.exports = router;