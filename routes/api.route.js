const express = require('express');
const router = express.Router();

const topicsRoute = require('./api.route.topics');
// const drivers = require('./api.route.drivers');
// const teams = require('./api.route.teams');
// const circuits = require('./api.route.circuits');


router.use('/topics', topicsRoute );

// router.use('/drivers', drivers);

// router.use('/teams', teams);

// router.use('/circuits', circuits);


module.exports = router;